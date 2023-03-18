import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { db } from "../firebase.config";

function Member() {
  const [memberData, setMemberData] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const params = useParams();

  const memberRef = doc(db, "oldMembers", params.memberId);

  const fetchMember = async () => {
    try {
      const docSnap = await getDoc(memberRef);
      if (docSnap.exists()) {
        setMemberData(docSnap.data());
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error fetching member data");
      console.log(error);
      navigate("/members");
    }
  };

  useEffect(() => {
    fetchMember();
    // eslint-disable-next-line
  }, []);

  if (loading)
    return (
      <div className="grid h-screen place-items-center">
        <Spinner />
      </div>
    );

  return (
    <div className="member-details mt-16 rounded-lg bg-gray-100 p-4">
      <h2 className="mb-4 text-2xl font-bold">
        {`${memberData.firstName} ${memberData.lastName}`}
      </h2>
      <hr className="mb-4 border-t border-gray-400" />
      <p className="mb-2 text-lg">
        <strong>Academics:</strong> {memberData.academics}
      </p>
      <p className="mb-2 text-lg">
        <strong>Age:</strong> {memberData.age}
      </p>
      <p className="mb-2 text-lg">
        <strong>Date of Birth:</strong> {memberData.dateOfBirth}
      </p>
      <p className="mb-2 text-lg">
        <strong>Gender:</strong> {memberData.gender}
      </p>
      <p className="mb-2 text-lg">
        <strong>Marital Status:</strong> {memberData.maritalStatus}
      </p>
      {memberData.maritalStatus === "Married" && (
        <p className="mb-2 text-lg">
          <strong>Married To:</strong> {memberData.marriedTo}
        </p>
      )}
      <p className="mb-2 text-lg">
        <strong>Email:</strong> {memberData.email}
      </p>
      <p className="mb-2 text-lg">
        <strong>First Language:</strong> {memberData.firstLanguage}
      </p>
      <p className="mb-2 text-lg">
        <strong>Number of Children:</strong> {memberData.numberOfChildren}
      </p>
      <p className="mb-2 text-lg">
        <strong>Where They Live:</strong> {memberData.whereTheyLive}
      </p>
      <p className="mb-2 text-lg">
        <strong>Woreda:</strong> {memberData.woreda}
      </p>
      {memberData.deceased && (
        <p className="mb-2 text-lg text-red-500">
          <strong>Deceased</strong>
        </p>
      )}
      {memberData.backSlider && (
        <p className="mb-2 text-lg text-red-500">
          <strong>Backslider</strong>
        </p>
      )}
      {memberData.churchChange && (
        <p className="mb-2 text-lg text-red-500">
          <strong>Changed Church</strong>
        </p>
      )}
    </div>
  );
}

export default Member;
