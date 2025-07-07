import Image from "next/image";

const UserCard = ({ type }: { type: string }) => {
  return (
    <div className="odd:bg-schoolPurple even:bg-schoolYellow flex-1 p-4 min-w-[150px] rounded-2xl">
      <div className="flex justify-between items-center">
        <span className="text-[10px] rounded-full py-1 px-1 text-green-500 bg-white">
          2025/26
        </span>
        <Image
          src="/more.png"
          alt=""
          width={20}
          height={20}
          className="h-auto cursor-pointer"
        />
      </div>
      <h2 className="text-2xl font-bold my-4">1,234</h2>
      <h3 className="capitalize text-sm font-medium text-gray-500">{type}s</h3>
    </div>
  );
};

export default UserCard;
