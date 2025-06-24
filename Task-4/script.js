document.addEventListener("DOMContentLoaded", () => {
  const metricTab = document.getElementById("metricTab");
  const otherTab = document.getElementById("otherTab");
  const heightUnit = document.getElementById("heightUnit");
  const weightUnit = document.getElementById("weightUnit");
  const form = document.getElementById("bmiForm");
  const results = document.getElementById("results");
  const measures = document.getElementById("measures");

  let usingMetric = true;

  metricTab.addEventListener("click", () => {
    usingMetric = true;
    metricTab.classList.add("active");
    otherTab.classList.remove("active");
    heightUnit.textContent = "cm";
    weightUnit.textContent = "kg";
  });

  otherTab.addEventListener("click", () => {
    usingMetric = false;
    otherTab.classList.add("active");
    metricTab.classList.remove("active");
    heightUnit.textContent = "in";
    weightUnit.textContent = "lbs";
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let height = parseFloat(document.getElementById("height").value);
    let weight = parseFloat(document.getElementById("weight").value);

    if (!height || !weight) {
      alert("Please fill all the fields.");
      return;
    }

    let bmi, pi;

    if (usingMetric) {
      height = height / 100;
      bmi = weight / (height * height);
      pi = weight / Math.pow(height, 3);
    } else {
      bmi = (703 * weight) / (height * height);
      pi = height / Math.cbrt(weight);
    }

    const bmiPrime = bmi / 25;
    const category = getBMICategory(bmi);

    document.getElementById("bmiValue").textContent = bmi.toFixed(1);
    document.getElementById("bmiCategory").textContent = category;
    document.getElementById("bmiPrime").textContent = bmiPrime.toFixed(2);
    document.getElementById("ponderalIndex").textContent = pi.toFixed(1);

    results.style.display = "block";
    measures.style.display = "block";

    showHealthMeasures(category);
  });

  function getBMICategory(bmi) {
    if (bmi < 16) return "Severe Thinness";
    if (bmi < 17) return "Moderate Thinness";
    if (bmi < 18.5) return "Mild Thinness";
    if (bmi < 25) return "Normal";
    if (bmi < 30) return "Overweight";
    if (bmi < 35) return "Obese Class I";
    if (bmi < 40) return "Obese Class II";
    return "Obese Class III";
  }

  function showHealthMeasures(category) {
    const adviceList = document.getElementById("adviceList");
    const healthIssues = document.getElementById("healthIssues");

    let advice = "", issues = "";

    switch (category) {
      case "Severe Thinness":
      case "Moderate Thinness":
      case "Mild Thinness":
        advice = `
          <ul>
            <li>Eat calorie-dense, nutrient-rich foods.</li>
            <li>Consult a dietitian or physician.</li>
            <li>Include lean proteins, healthy fats, and complex carbs.</li>
            <li>Strength training to build muscle mass.</li>
          </ul>`;
        issues = `
          <ul>
            <li>Weakened immune system</li>
            <li>Bone density loss (osteoporosis)</li>
            <li>Fatigue and anemia</li>
            <li>Fertility issues</li>
          </ul>`;
        break;
      case "Normal":
        advice = `
          <ul>
            <li>Maintain a balanced diet and regular physical activity.</li>
            <li>Stay hydrated and sleep well.</li>
            <li>Routine health checkups are recommended.</li>
          </ul>`;
        issues = `<p>No significant risks. Continue a healthy lifestyle!</p>`;
        break;
      case "Overweight":
        advice = `
          <ul>
            <li>Adopt a calorie-controlled, whole-food diet.</li>
            <li>Engage in moderate exercise at least 30 mins/day.</li>
            <li>Track habits and monitor progress.</li>
          </ul>`;
        issues = `
          <ul>
            <li>Higher risk of type 2 diabetes</li>
            <li>Increased blood pressure and cholesterol</li>
            <li>Joint pain and fatigue</li>
          </ul>`;
        break;
      case "Obese Class I":
      case "Obese Class II":
      case "Obese Class III":
        advice = `
          <ul>
            <li>Work with healthcare professionals on a weight loss plan.</li>
            <li>Focus on long-term behavior change, not fad diets.</li>
            <li>Support groups and counseling can help.</li>
            <li>Monitor medical indicators regularly.</li>
          </ul>`;
        issues = `
          <ul>
            <li>Heart disease and stroke</li>
            <li>Type 2 diabetes</li>
            <li>Breathing problems, including sleep apnea</li>
            <li>Fatty liver and gallbladder disease</li>
            <li>Certain cancers</li>
          </ul>`;
        break;
      default:
        advice = "<p>No advice found.</p>";
        issues = "<p>No health risks found.</p>";
    }

    adviceList.innerHTML = advice;
    healthIssues.innerHTML = issues;
  }

  const infoIcon = document.getElementById("infoToggle");
  const bmiContainer = document.querySelector(".bmi-calculator-container");
  const bmiInfo = document.getElementById("bmiInfo");

  infoIcon.addEventListener("click", () => {
    const isCalculatorVisible = bmiContainer.style.display !== "none";

    bmiContainer.style.display = isCalculatorVisible ? "none" : "block";
    bmiInfo.style.display = isCalculatorVisible ? "block" : "none";
  });

});