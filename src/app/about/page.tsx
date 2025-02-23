import { FaUserTie, FaUser } from "react-icons/fa";
import Footer from "@/components/Footer"; // Import the Footer component

const AboutUs = () => {
  return (
    <div className="flex flex-col min-h-screen">
    <main className="p-8 mx-auto max-w-7xl">
      <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>

      {/* Mission and Vision Section */}
      <section className="grid gap-8 lg:grid-cols-2 mb-12">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-blue-100 rounded-full shadow-lg">
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
          {[
            { icon: "fas fa-users", color: "orange", title: "Community", description: "We believe in fostering a strong learning community that thrives on collaboration, support, and shared growth." },
            { icon: "fas fa-lightbulb", color: "pink", title: "Innovation", description: "Constant innovation is at the heart of what we do. We strive to bring cutting-edge learning experiences to our users." },
            { icon: "fas fa-arrow-up", color: "yellow", title: "Growth", description: "We are committed to helping individuals and organizations grow by providing personalized, dynamic learning paths." },
            { icon: "fas fa-globe", color: "teal", title: "Global Reach", description: "Our platform is designed to be globally accessible, enabling learners from all parts of the world to access high-quality education." }
          ].map((value, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className={`p-4 bg-${value.color}-100 rounded-full shadow-lg mb-4`}>
                <i className={`${value.icon} text-5xl text-${value.color}-600`} />
              </div>
              <h3 className="text-xl font-semibold">{value.title}</h3>
              <p className="text-gray-600 text-center">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: "Javed Jabbar", role: "Group Leader", icon: <FaUserTie className="text-5xl text-gray-700" /> },
            { name: "Tooba Kashif", role: "Group Member", icon: <FaUser className="text-5xl text-gray-700" /> },
            { name: "Hina Kanwal", role: "Group Member", icon: <FaUser className="text-5xl text-gray-700" /> }
          ].map((member, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="p-6 bg-gray-200 rounded-full shadow-lg mb-4">{member.icon}</div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
      
    </main>
    {/* Footer */}
    <Footer />
    </div>
  );
};

export default AboutUs;
