'use client';

import { useRouter } from 'next/navigation';

const PageNavigation = ({
  name,
  description,
  link,
}: {
  name: string;
  description: string;
  link: string;
}) => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(link);
      }}
      className="flex flex-row items-start p-4 rounded-md hover:bg-gray-100 transition-colors duration-200 border border-gray-200 w-100"
    >
      <div className="flex flex-col">
        <div className="text-slate-600 font-medium hover:text-slate-800">
          {name} Page
        </div>
        <div className="text-sm text-gray-500">{description}</div>
      </div>
    </div>
  );
};
export default PageNavigation;
