export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-700">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white text-center mb-12">
          Welcome to the Best Blog Site in the World
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white bg-opacity-30 rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Latest Articles
            </h2>
            {/* Insert your latest articles here */}
          </div>
          <div className="bg-white bg-opacity-30 rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Popular Categories
            </h2>
            {/* Insert popular categories or tags here */}
          </div>
          <div className="bg-white bg-opacity-30 rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              About Us
            </h2>
            <p className="text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              mattis risus non ex tempor, id varius eros placerat. Sed auctor
              eleifend velit sit amet tempus. Phasellus malesuada massa vitae mi
              consequat, sit amet tincidunt leo ullamcorper. Sed convallis,
              felis quis posuere tempor, odio nisi lacinia arcu, id vehicula
              justo urna vel velit.
            </p>
          </div>
          <div className="bg-white bg-opacity-30 rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Follow Us
            </h2>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-gray-300">
                <svg
                  className="w-8 h-8 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  {/* Insert your social media icon here */}
                </svg>
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                <svg
                  className="w-8 h-8 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  {/* Insert your social media icon here */}
                </svg>
              </a>
              {/* Add more social media links/icons */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
