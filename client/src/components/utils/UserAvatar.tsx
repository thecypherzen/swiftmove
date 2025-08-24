import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/UseAuth";
import { cn } from "@/lib/utils";

const UserAvatar = ({ size = 10, className }: UserAvatarPropsType) => {
  const { user } = useAuth();
  return (
    <Avatar className={cn(`size-${size}`)}>
      <AvatarImage
        src={`${user?.avatar}`}
        alt={`${user?.firstName}`}
        className={className}
      />
      <AvatarFallback className={className}>
        {(user?.firstName ?? user?.email)?.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};

export type UserAvatarPropsType = {
  className?: string;
  size?: number;
};
export default UserAvatar;
