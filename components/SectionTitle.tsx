// Заголовок раздела в общем стиле сайта
export default function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-12">
      <h2 className="font-cormorant font-semibold text-4xl lg:text-5xl mb-3" style={{ color: "#F5F0E8" }}>
        {title}
      </h2>
      {subtitle && (
        <p className="font-nunito text-base max-w-2xl mx-auto" style={{ color: "rgba(245,240,232,0.72)" }}>
          {subtitle}
        </p>
      )}
      <div
        className="w-16 h-px mx-auto mt-6"
        style={{ background: "linear-gradient(90deg, transparent, #C9A96E, transparent)" }}
      />
    </div>
  );
}
