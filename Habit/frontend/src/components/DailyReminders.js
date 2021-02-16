import React, { useState } from "react";

function DailyReminders({ match }) {
  const [userId, setUserId] = useState(match.params.userId);

  return (
    <div>
      <h1>{userId}</h1>
      <p>TEST</p>
    </div>
  );
}

export default DailyReminders;
