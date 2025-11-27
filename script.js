async function fetchTimetable() {
  const today = new Date().toISOString().split("T")[0];
  const studentId = "12345"; // 仮のID（後でLINE連携に差し替え）

  const url = `https://example.com/api/timetable?date=${today}&student_id=${studentId}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("APIエラー");

    const data = await res.json();
    displayTimetable(data);
  } catch (error) {
    document.getElementById("timetable").innerHTML =
      "<p>データ取得に失敗しました。</p>";
  }
}

function displayTimetable(timetable) {
  const container = document.getElementById("timetable");
  container.innerHTML = "";

  timetable.forEach(t => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <h3>${t.period}限：${t.subject}</h3>
      <p>教室：${t.room}</p>
    `;
    container.appendChild(div);
  });
}

liff.init({ liffId: "あなたのLIFF ID" }).then(() => {
  const userId = liff.getDecodedIDToken().sub;
  console.log("LINEユーザーID:", userId);
});

fetchTimetable();
