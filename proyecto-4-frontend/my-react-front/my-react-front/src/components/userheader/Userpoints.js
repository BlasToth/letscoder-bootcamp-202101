import React from 'react';


export default function Userpoints(props) {
    const starRank = "🌟"; // 2000+
    const champRank = "🏆"; // 1000+
    const goldRank = "🥇"; // 500+
    const silverRank = "🥈"; // 200+
    const bronzeRank = "🥉"; // 50+

    const points = props.points;
    let rank = "";
    if (points < 50) rank = "";
    else if (points < 200 && points >= 50) rank = bronzeRank;
    else if (points < 500 && points >= 200) rank = silverRank;
    else if (points < 1000 && points >= 500) rank = goldRank;
    else if (points < 2000 && points >= 1000) rank = champRank;
    else if (points >= 2000) rank = starRank;
    

    return (
        <div>
            Points: <span className="strong">{ points + rank  }</span>
        </div>
    )
}
