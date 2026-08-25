export default function DevTag({ children }: { children: string }) {
  return (
    <span className="dev-tag absolute bottom-3 right-3 z-10 text-paper">
      {children}
    </span>
  );
}
