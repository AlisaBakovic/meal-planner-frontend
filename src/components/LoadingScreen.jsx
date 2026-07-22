function LoadingScreen({
  title = "Something went wrong",
  subtitle = "Please try again in a few moments.",
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[url('/picture/Purple-bg-homepage.png')] bg-cover bg-center flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-gradient-to-br from-[#f7f4ff]/95 via-[#f7f4ff]/70 to-[#f7f4ff]/35 backdrop-blur-[3px]"></div>

      <div className="relative z-10 w-full max-w-md">
        <div className="relative overflow-hidden rounded-[36px] border border-white/30 bg-white/60 backdrop-blur-2xl p-10 shadow-[0_20px_60px_rgba(98,0,255,0.08)] text-center">
          <div className="absolute top-0 left-0 h-40 w-40 rounded-full bg-[#9b6cff]/10 blur-3xl"></div>

          <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-[#7b4dff]/10 blur-3xl"></div>

          <div className="relative z-10">
            <div className="flex justify-center">
              <div className="relative h-20 w-20">
                <div className="absolute inset-0 rounded-full border-[3px] border-[#9b6cff]/15"></div>

                <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#9b6cff] animate-spin"></div>
              </div>
            </div>

            <h2
              className="mt-8 text-3xl font-bold tracking-[-0.03em] text-[#24163b]"
              style={{ fontFamily: "Plus Jakarta Sans" }}
            >
              {title}
            </h2>

            <p className="mt-3 text-[15px] leading-relaxed text-[#8d87a1]">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
