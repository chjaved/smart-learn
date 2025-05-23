"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Game, Question } from "@prisma/client";
import { differenceInSeconds } from "date-fns";
import { BarChart, ChevronRight, Loader2, Timer } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button, buttonVariants } from "./ui/button";
import { useToast } from "./ui/use-toast";
import MCQCounter from "./MCQCounter";
import { checkAnswerSchema, endGameSchema } from "@/schemas/questions";
import { cn, formatTimeDelta } from "@/lib/utils";

type Props = {
  game: Game & {
    questions: Pick<Question, "id" | "options" | "question">[];
  };
};

const MCQ = ({ game }: Props) => {
  const router = useRouter();
  const { toast } = useToast();

  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [hasEnded, setHasEnded] = React.useState(false);
  const [stats, setStats] = React.useState({
    correct_answers: 0,
    wrong_answers: 0,
  });
  const [selectedChoice, setSelectedChoice] = React.useState<number>(0);
  const [now, setNow] = React.useState(new Date());

  const currentQuestion = React.useMemo(
    () => game.questions[questionIndex],
    [questionIndex, game.questions]
  );

  const options = React.useMemo(() => {
    if (!currentQuestion?.options) return [];
    return JSON.parse(currentQuestion.options as string) as string[];
  }, [currentQuestion]);

  const { mutate: checkAnswer, isLoading: isChecking } = useMutation({
    mutationFn: async () => {
      const payload: z.infer<typeof checkAnswerSchema> = {
        questionId: currentQuestion.id,
        userInput: options[selectedChoice],
      };
      const response = await axios.post(`/api/checkAnswer`, payload);
      return response.data;
    },
  });

  const { mutate: endGame } = useMutation({
    mutationFn: async () => {
      const payload: z.infer<typeof endGameSchema> = {
        gameId: game.id,
      };
      const response = await axios.post(`/api/endGame`, payload);
      return response.data;
    },
  });

  // Update timer every second until quiz ends
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (!hasEnded) setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, [hasEnded]);

  // Handle answer submission and navigation to next question or end
  const handleNext = React.useCallback(() => {
    checkAnswer(undefined, {
      onSuccess: ({ isCorrect }) => {
        setStats((prev) => ({
          correct_answers: prev.correct_answers + (isCorrect ? 1 : 0),
          wrong_answers: prev.wrong_answers + (isCorrect ? 0 : 1),
        }));

        toast({
          title: isCorrect ? "Correct" : "Incorrect",
          description: isCorrect
            ? "You got it right!"
            : "You got it wrong!",
          variant: isCorrect ? "success" : "destructive",
        });

        if (questionIndex === game.questions.length - 1) {
          endGame();
          setHasEnded(true);
        } else {
          setQuestionIndex((i) => i + 1);
          setSelectedChoice(0);
        }
      },
    });
  }, [
    checkAnswer,
    endGame,
    game.questions.length,
    questionIndex,
    selectedChoice,
    toast,
  ]);

  // Keyboard shortcuts: 1-4 for choices, Enter for Next
  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (hasEnded) return;

      if (["1", "2", "3", "4"].includes(e.key)) {
        setSelectedChoice(Number(e.key) - 1);
      } else if (e.key === "Enter") {
        handleNext();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [handleNext, hasEnded]);

  // Render final screen
  if (hasEnded) {
    return (
      <div className="absolute flex flex-col justify-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <div className="px-4 py-2 mt-2 font-semibold text-white bg-green-500 rounded-md whitespace-nowrap">
          You completed in{" "}
          {formatTimeDelta(
            differenceInSeconds(now, game.timeStarted)
          )}
        </div>
        <Link
          href={`/statistics/${game.id}`}
          className={cn(buttonVariants({ size: "lg" }), "mt-2")}
        >
          View Statistics
          <BarChart className="w-4 h-4 ml-2" />
        </Link>
      </div>
    );
  }

  // Render quiz screen
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 md:w-[80vw] max-w-4xl w-[90vw] top-1/2 left-1/2">
      <div className="flex flex-row justify-between items-center">
        {/* Left: topic & timer */}
        <div className="flex flex-col">
          <p>
            <span className="text-slate-400">Topic</span>{" "}
            <span className="px-2 py-1 text-white rounded-lg bg-slate-800">
              {game.topic}
            </span>
          </p>
          <div className="flex self-start mt-3 text-slate-400">
            <Timer className="mr-2" />
            {formatTimeDelta(differenceInSeconds(now, game.timeStarted))}
          </div>
        </div>

        {/* Right: quit button & counter */}
        <div className="flex items-center space-x-4">
          
          <Button
          variant="default"
          size="lg"
          onClick={() => router.push("/dashboard")}
        >
          Quit <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
          <MCQCounter
            correct_answers={stats.correct_answers}
            wrong_answers={stats.wrong_answers}
          />
        </div>
      </div>

      <Card className="w-full mt-4">
        <CardHeader className="flex flex-row items-center">
          <CardTitle className="mr-5 text-center divide-y divide-zinc-600/50">
            <div>{questionIndex + 1}</div>
            <div className="text-base text-slate-400">
              {game.questions.length}
            </div>
          </CardTitle>
          <CardDescription className="flex-grow text-lg">
            {currentQuestion?.question}
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="flex flex-col items-center justify-center w-full mt-4">
        {options.map((option, idx) => (
          <Button
            key={idx}
            variant={selectedChoice === idx ? "default" : "outline"}
            className="justify-start w-full py-8 mb-4"
            onClick={() => setSelectedChoice(idx)}
          >
            <div className="flex items-center justify-start">
              <div className="p-2 px-3 mr-5 border rounded-md">
                {idx + 1}
              </div>
              <div className="text-start">{option}</div>
            </div>
          </Button>
        ))}

        <Button
          variant="default"
          size="lg"
          disabled={isChecking}
          onClick={handleNext}
        >
          {isChecking && (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          )}
          Next <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default MCQ;
