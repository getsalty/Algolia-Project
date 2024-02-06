import { useSession } from 'next-auth/react';
import { trpc } from '~/utils/trpc';

type Props = {};

const UserBadge = (props: Props) => {
  const { data: session } = useSession();
  const { data: userInfo } = trpc.userInfo.useQuery(undefined, {
    enabled: !!session,
  });

  if (!userInfo) {
    return null;
  }

  if (!!userInfo.image) {
    const backgroundImage = userInfo.image ?? undefined;

    return (
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
        className="mx-1 inline-flex h-9 w-9 select-none items-center justify-center rounded-full bg-contain"
      />
    );
  }

  const singleLetter = userInfo.name?.charAt(0) ?? '';

  return (
    <div className="mx-1 inline-flex h-9 w-9 select-none items-center justify-center rounded-full bg-contain">
      <span className="text-xl font-bold text-gray-800">
        {singleLetter.toUpperCase()}
      </span>
    </div>
  );
};

export default UserBadge;
