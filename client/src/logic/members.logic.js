import {uploadImageFileRequest} from "../requests/image.proxy";
import {dispatch} from "../store/store";
import {updateMembersAction} from "../store/slices/user.slice";

export const addFamilyMember = async ({ name, longDescription, birthdate, profileImage }) => {
    const profileImageUrl = await uploadImageFileRequest(profileImage);
    dispatch(updateMembersAction([...members, {
        name,
        longDescription,
        birthdate,
        profileImage: profileImageUrl
    }]))
    setAddForm(false);
}