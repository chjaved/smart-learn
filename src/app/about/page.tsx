import Image from "next/image";

const AboutUs = () => {
  return (
    <main className="p-8 mx-auto max-w-7xl">
      <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>

      {/* Mission and Vision Section */}
      <section className="grid gap-8 lg:grid-cols-2 mb-12">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-blue-100 rounded-full shadow-lg">
            {/* Mission Icon (Font Awesome) */}
            <i className="fas fa-bullseye text-4xl text-blue-600" />
          </div>
          <div>
            <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
            <p className="text-lg text-gray-700">
              At SmartLearn, we are on a mission to revolutionize the way knowledge is shared and learned. We aim to make learning accessible, engaging, and tailored to each individual’s needs, whether for personal growth, academic excellence, or professional development.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="p-4 bg-green-100 rounded-full shadow-lg">
            {/* Vision Icon (Font Awesome) */}
            <i className="fas fa-eye text-4xl text-green-600" />
          </div>
          <div>
            <h2 className="text-3xl font-semibold mb-4">Our Vision</h2>
            <p className="text-lg text-gray-700">
              Our vision is to provide a global platform that bridges the gap in learning resources. We aim to create a space where learners of all backgrounds can come together to share knowledge and grow.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4 text-center">Our Core Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center">
            <div className="p-4 bg-orange-100 rounded-full shadow-lg mb-4">
              {/* Core Value Icon (Font Awesome) */}
              <i className="fas fa-users text-5xl text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold">Community</h3>
            <p className="text-gray-600 text-center">
              We believe in fostering a strong learning community that thrives on collaboration, support, and shared growth.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="p-4 bg-pink-100 rounded-full shadow-lg mb-4">
              {/* Core Value Icon (Font Awesome) */}
              <i className="fas fa-lightbulb text-5xl text-pink-600" />
            </div>
            <h3 className="text-xl font-semibold">Innovation</h3>
            <p className="text-gray-600 text-center">
              Constant innovation is at the heart of what we do. We strive to bring cutting-edge learning experiences to our users.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="p-4 bg-yellow-100 rounded-full shadow-lg mb-4">
              {/* Core Value Icon (Font Awesome) */}
              <i className="fas fa-arrow-up text-5xl text-yellow-600" />
            </div>
            <h3 className="text-xl font-semibold">Growth</h3>
            <p className="text-gray-600 text-center">
              We are committed to helping individuals and organizations grow by providing personalized, dynamic learning paths.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="p-4 bg-teal-100 rounded-full shadow-lg mb-4">
              {/* Core Value Icon (Font Awesome) */}
              <i className="fas fa-globe text-5xl text-teal-600" />
            </div>
            <h3 className="text-xl font-semibold">Global Reach</h3>
            <p className="text-gray-600 text-center">
              Our platform is designed to be globally accessible, enabling learners from all parts of the world to access high-quality education.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section>
        <h2 className="text-3xl font-semibold mb-4 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <Image
              src="/images/team-member-1.jpg"
              alt="Team Member"
              width={200}
              height={200}
              className="rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold">Jane Doe</h3>
            <p className="text-gray-600">CEO & Co-founder</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Image
              src="/images/team-member-2.jpg"
              alt="Team Member"
              width={200}
              height={200}
              className="rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold">John Smith</h3>
            <p className="text-gray-600">CTO & Co-founder</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Image
              src="/images/team-member-3.jpg"
              alt="Team Member"
              width={200}
              height={200}
              className="rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold">Alice Johnson</h3>
            <p className="text-gray-600">Lead Developer</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUs;
