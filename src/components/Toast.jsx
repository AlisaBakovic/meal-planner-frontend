import { AnimatePresence, motion } from "framer-motion";

function Toast({ show, title, message }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          transition={{ duration: 0.25 }}
          className="fixed right-8 bottom-8 z-50 w-[360px] rounded-[28px] border border-white/40 bg-white/80 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.10)] backdrop-blur-2xl"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#f5efff]">
              <svg
                className="h-5 w-5 text-[#8b5cf6]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <div>
              <h3
                className="text-[17px] font-bold text-[#24163b]"
                style={{ fontFamily: "Plus Jakarta Sans" }}
              >
                {title}
              </h3>

              <p className="mt-1 text-sm leading-6 text-[#8d87a1]">{message}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Toast;
