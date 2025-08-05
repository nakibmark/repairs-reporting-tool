'use client';

const DisplayRow = ({
  items,
  label,
}: {
  items: { id: number; name: string }[];
  label: string;
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row space-x-2">
        <div className="font-bold mb-2 w-40">{label}</div>
        {items.map((item) => (
          <div
            key={item.id}
            className="py-2 px-2 border rounded-md shadow-sm w-fit cursor-pointer"
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayRow;
