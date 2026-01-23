export default function AdminLogin() {
  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Sign in to Admin Dashboard</h2>
            <p className="mt-2 text-sm text-gray-600">
              Access your account and manage your construction activities with the right tools for your role.
            </p>
          </div>

          <div className="mt-8">
            <form className="space-y-6">
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-900 text-white py-3 px-4 rounded-full hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full left-0 object-cover"
          src="/images/construction-silhouette.jpg"
          alt="Construction site"
        />
        <div className="absolute inset-0 bg-gray-900/65 bg-opacity-50 flex flex-col justify-center items-center text-white p-12">
          <div className="text-center">
            <div className="flex items-center justify-center mb-8">
              <img src="/favicon.ico" alt="Site Supervise" className="w-20 h-24 mr-4" />
              <h1 className="text-4xl text-left font-bold">
                SITE<br />SUPERVISE
              </h1>
            </div>
            <p className="text-xl font-bold text-center max-w-md">
              Manage, monitor, and analyze every construction project — all from one platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}