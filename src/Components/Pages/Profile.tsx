import { useState, useEffect } from "react";
import { collection, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import {
  EmailAuthProvider,
  PhoneAuthCredential,
  PhoneAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  updatePhoneNumber,
} from "firebase/auth";
import { Box, Card } from "@mui/material";

interface PersonalDetailsProps {
  userId: string;
}

interface UserData {
  name: string;
  email: string;
  phoneNumber: string;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({ userId }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");

  const handleChangePassword = async () => {
    try {
      const user = auth.currentUser;

      if (user) {
        if (user.email) {
          const credential = EmailAuthProvider.credential(
            user.email,
            currentPassword
          );
          await reauthenticateWithCredential(user, credential);
          await updatePassword(user, newPassword);

          console.log("Password updated successfully!");
          setCurrentPassword("");
          setNewPassword("");
          setError("");
        } else {
          setError("User email not found.");
        }
      }
    } catch (error) {
      setError(
        "Failed to update password. Please check your current password."
      );
      console.log("Error updating password:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRef = doc(collection(db, "managers"), userId);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data() as UserData;
          setUserData(userData);
        } else {
          console.log("User document does not exist");
        }
      } catch (error) {
        console.log("Error retrieving user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <div>
      <div className="personal-details">
        <h2>Personal Details</h2>
        {userData && (
          <>
            <p>Name: {userData.name}</p>
            <p>Email: {userData.email}</p>
            <p>Phone Number: {userData.phoneNumber}</p>
          </>
        )}
      </div>
      <p></p>
      <Card
        variant="outlined"
        sx={{
          borderWidth: "2px",
          borderColor: "#4a4a4a",
          marginBottom: "20px",
        }}
      >
        <div className="change-password">
          <h2>Change Password</h2>
          <div>
            <label>
              Current Password:
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              New Password:
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </label>
          </div>
          <p></p>
          <button className="accept-button" onClick={handleChangePassword}>
            Change Password
          </button>
          {error && <p>{error}</p>}
        </div>
      </Card>
    </div>
  );
};

export default PersonalDetails;
