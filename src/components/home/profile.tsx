import UserProfile, {type Profile} from "../../utils/UserProfile";

const testUser: Profile = new UserProfile('Emmanuel', new Date('Wed Jan 14 2026')
, 10, 1, 5, 500, 100, 20, 2, 50, 10, 12, 4000, 400, 100, 18, 400, 49, 100, 10000, 1000, 2000, 200)

export default function Profile(){

    return(
        <div className="border-3 min-h-50">

        </div>
    )
}