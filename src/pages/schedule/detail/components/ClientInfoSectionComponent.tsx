import { MailIcon, PhoneIcon } from "lucide-react";
import TextConstant from "../../../../data/commons/constants/TextConstant";

type Props = {
  email: string;
  phone: string;
  address: string;
};

export default function ClientInfoSectionComponent({
  email,
  phone,
  address,
}: Props) {
  return (
    <>
      <h3 className="font-bold mt-5">{TextConstant.clientContact}</h3>
      <div className="flex flex-row gap-3 mt-2">
        <MailIcon className="w-5 h-5" />
        <p className="text-sm">{email}</p>
      </div>
      <div className="flex flex-row gap-3 mt-2">
        <PhoneIcon className="w-5 h-5" />
        <p className="text-sm">{phone}</p>
      </div>
      <h3 className="font-bold mt-5">Address</h3>
      <p className="text-sm mt-2">{address}</p>
    </>
  );
}
