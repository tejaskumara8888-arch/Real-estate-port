const STEPS = [
  {
    time: "00:00",
    title: "Send your footage",
    body: "Drone clips, walkthrough footage, whatever you've got. Drive, Dropbox, or WeTransfer — no special format needed.",
  },
  {
    time: "00:10",
    title: "Pick a package",
    body: "Match it to what the listing needs: a quick reel, a full listing edit, or an ongoing monthly package.",
  },
  {
    time: "00:20",
    title: "Edit + review",
    body: "Footage gets cut, graded, and scored. You get a review link before anything is called final.",
  },
  {
    time: "00:30",
    title: "Delivery",
    body: "Final files land in your inbox in both landscape and vertical, ready to post or hand to your MLS.",
  },
];

export default function Process() {
  return (
    <section id="process" className="bg-ink px-5 md:px-8 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-baseline gap-4 mb-2">
          <span className="timecode text-xs text-signal">00:40</span>
          <div className="h-px flex-1 bg-line" />
        </div>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-paper">
          How a project runs
        </h2>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
          {STEPS.map((step, i) => (
            <div
              key={step.time}
              className="group relative pl-6 md:pl-0 transition-transform duration-300 ease-out hover:-translate-y-1"
            >
              <div className="md:mb-5">
                <span className="timecode text-xs text-slate-dim transition-colors duration-300 group-hover:text-signal">
                  {step.time}
                </span>
                <div className="mt-2 h-px w-full bg-line relative">
                  <span className="absolute inset-0 bg-signal origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" />
                  <span className="absolute -top-[3px] left-0 w-1.5 h-1.5 rounded-full bg-signal z-10 transition-transform duration-300 ease-out group-hover:scale-[1.8] group-hover:shadow-[0_0_10px_2px_rgba(255,75,43,0.6)]" />
                </div>
              </div>
              <h3 className="font-display font-medium text-lg text-paper transition-colors duration-300 group-hover:text-signal-soft">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-slate leading-relaxed">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
