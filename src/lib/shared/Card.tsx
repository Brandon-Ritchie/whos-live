function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="card card-compact min-w-72 max-w-96 flex-1 bg-neutral shadow-xl">
      <div className="card-body">{children}</div>
    </div>
  );
}

export default Card;
