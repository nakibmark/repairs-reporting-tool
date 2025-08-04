const DisplayFlexBox = ({
  items,
  label,
}: {
  items: { id: number; name: string }[];
  label: string;
}) => {
  return (
    <div className="flex flex-row space-x-2">
      <div className="font-bold mb-2 w-48">{label}</div>
      {items.map((item) => (
        <div
          className="py-2 px-4 border rounded-md shadow-sm w-fit"
          key={item.id}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};
export default DisplayFlexBox;
