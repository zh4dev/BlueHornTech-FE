import CustomButtonComponent from "../data/commons/components/CustomButtonComponent";
import TextConstant from "../data/commons/constants/TextConstant";
import { useLogout } from "../data/hooks/useLogout";

export default function ProfilePage() {
  const { onLogout } = useLogout();
  return (
    <div>
      <CustomButtonComponent variant="outlineWarning" onClick={onLogout}>
        {TextConstant.signOut}
      </CustomButtonComponent>
    </div>
  );
}
