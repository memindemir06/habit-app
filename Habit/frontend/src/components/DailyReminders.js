import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

function DailyReminders({ leaveAccountCallback }) {
  const params = useParams();
  const history = useHistory();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    fetch("api/userIdValid" + "?user_id=" + params.userId)
      .then((response) => {
        if (!response.ok) {
          leaveAccountCallback();
          history.push("/ErrorPage");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (!data) {
          setUserId(null);
        } else {
          setUserId(data.user_id);
        }
      });
  }, []);

  if (!userId) {
    return null;
  }

  return (
    <div>
      <h1>{userId}</h1>
      <p>text</p>
    </div>
  );
}

export default DailyReminders;
