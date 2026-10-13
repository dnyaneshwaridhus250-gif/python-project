let students = [
  {name:"Aarav Patil", python:78, c:72, js:85},
  {name:"Sneha Sharma", python:65, c:80, js:74},
  {name:"Rohan More", python:90, c:88, js:92},
  {name:"Priya Jadhav", python:82, c:76, js:79},
  {name:"Om Kulkarni", python:55, c:61, js:58},
  {name:"Ananya Deshmukh", python:94, c:91, js:89}
];

function calc(s){let total=s.python+s.c+s.js; return {...s,total,avg:total/3};}
function render(){
  students=students.map(s=>calc(s));
  document.getElementById("totalStudents").textContent=students.length;
  const avg=students.length?students.reduce((a,s)=>a+s.avg,0)/students.length:0;
  const passed=students.filter(s=>s.avg>=40).length;
  document.getElementById("classAverage").textContent=avg.toFixed(1)+"%";
  document.getElementById("passRate").textContent=(students.length?passed/students.length*100:0).toFixed(0)+"%";
  let top=[...students].sort((a,b)=>b.avg-a.avg)[0];
  document.getElementById("topPerformer").textContent=top?top.name:"—";
  document.getElementById("topScore").textContent=top?top.avg.toFixed(1)+"% average":"No records";
  document.getElementById("passedCount").textContent=passed;
  document.getElementById("failedCount").textContent=students.length-passed;
  document.getElementById("donutValue").textContent=(students.length?passed/students.length*100:0).toFixed(0)+"%";
  document.getElementById("donut").style.background=`conic-gradient(#5b6ff5 0deg ${students.length?passed/students.length*360:0}deg,#edf0f6 ${students.length?passed/students.length*360:0}deg 360deg)`;
  renderTable(); renderCharts(); renderInsights();
}
function renderTable(){
  const q=document.getElementById("search").value.toLowerCase();
  const body=document.getElementById("studentTable");
  body.innerHTML="";
  students.filter(s=>s.name.toLowerCase().includes(q)).forEach((s,i)=>{
    const tr=document.createElement("tr");
    tr.innerHTML=`<td><b>${s.name}</b></td><td>${s.python}</td><td>${s.c}</td><td>${s.js}</td><td><b>${s.total}</b></td><td><b>${s.avg.toFixed(1)}%</b></td><td><span class="status ${s.avg>=40?"pass":"fail-status"}">${s.avg>=40?"Passed":"Needs Support"}</span></td><td><button class="delete" onclick="removeStudent(${students.indexOf(s)})">Delete</button></td>`;
    body.appendChild(tr);
  });
}
function renderCharts(){
  const subjects=[["Python","python"],["C","c"],["JavaScript","js"]];
  document.getElementById("subjectChart").innerHTML=subjects.map(([label,key])=>{
    const v=students.length?students.reduce((a,s)=>a+s[key],0)/students.length:0;
    return `<div class="bar-item"><b>${v.toFixed(0)}%</b><div class="bar" style="height:${Math.max(v,3)}%"></div><span>${label}</span></div>`;
  }).join("");
}
function renderInsights(){
  const avg=students.length?students.reduce((a,s)=>a+s.avg,0)/students.length:0;
  const bestSubject=[["Python",students.reduce((a,s)=>a+s.python,0)],["C",students.reduce((a,s)=>a+s.c,0)],["JavaScript",students.reduce((a,s)=>a+s.js,0)]].sort((a,b)=>b[1]-a[1])[0];
  const top=[...students].sort((a,b)=>b.avg-a.avg)[0];
  document.getElementById("insights").innerHTML=`
    <div class="insight"><b>Overall Performance</b><br>Class average is <strong>${avg.toFixed(1)}%</strong> across ${students.length} student records.</div>
    <div class="insight"><b>Strongest Subject</b><br><strong>${bestSubject?bestSubject[0]:"—"}</strong> currently has the highest class total.</div>
    <div class="insight"><b>Top Performer</b><br>${top?`<strong>${top.name}</strong> has an average of ${top.avg.toFixed(1)}%.`:"Add students to see insights."}</div>`;
}
function removeStudent(i){if(confirm("Delete this student record?")){students.splice(i,1);render();}}
function openModal(){document.getElementById("modal").classList.add("show");}
function closeModal(){document.getElementById("modal").classList.remove("show");}
function addStudent(e){
  e.preventDefault();
  students.push({name:document.getElementById("name").value.trim(),python:+document.getElementById("python").value,c:+document.getElementById("c").value,js:+document.getElementById("js").value});
  e.target.reset(); closeModal(); render();
}
function downloadCSV(){
  const rows=[["Student","Python","C","JavaScript","Total","Average","Status"],...students.map(s=>[s.name,s.python,s.c,s.js,s.total,s.avg.toFixed(2),s.avg>=40?"Passed":"Needs Support"])];
  const csv=rows.map(r=>r.join(",")).join("\n");
  const a=document.createElement("a"); a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv"})); a.download="student-performance-report.csv"; a.click();
}
render();