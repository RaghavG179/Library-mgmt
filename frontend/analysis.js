document.addEventListener("DOMContentLoaded", () => {
    const departmentFilter = document.getElementById("departmentFilter");
    const designationFilter = document.getElementById("designationFilter");
    const startDate = document.getElementById("startDate");
    const endDate = document.getElementById("endDate");
    const exportBtn = document.getElementById("exportBtn");
    const tableBody = document.getElementById("analysisTable");
  
    let data = [];
  
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:5000/all-logs");
        data = await res.json();
        renderTable(data);
      } catch (err) {
        console.error("Failed to load data", err);
      }
    }
  
    function applyFilters() {
      const dept = departmentFilter.value;
      const desg = designationFilter.value;
      const start = startDate.value ? new Date(startDate.value) : null;
      const end = endDate.value ? new Date(endDate.value) : null;
  
      const filtered = data.filter(entry => {
        const entryDate = new Date(entry.entryTime);
        return (!dept || entry.department === dept) &&
               (!desg || entry.designation === desg) &&
               (!start || entryDate >= start) &&
               (!end || entryDate <= end);
      });
  
      renderTable(filtered);
    }
  
    function renderTable(filtered) {
      tableBody.innerHTML = "";
      filtered.forEach(entry => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${entry.name}</td>
          <td>${entry.department}</td>
          <td>${entry.designation}</td>
          <td>${new Date(entry.entryTime).toLocaleDateString()}</td>
          <td>${new Date(entry.entryTime).toLocaleTimeString()}</td>
          <td>${entry.exitTime ? new Date(entry.exitTime).toLocaleTimeString() : '-'}</td>
        `;
        tableBody.appendChild(row);
      });
    }
  
    function exportToCSV() {
      let csv = "Name,Department,Designation,Entry Date,Entry Time,Exit Time\n";
  