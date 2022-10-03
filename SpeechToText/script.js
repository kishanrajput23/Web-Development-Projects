var btn = document.querySelector(".btn");
btn.addEventListener("click", (ea) => {
  btn.classList.add("fade");

  let recognition = new webkitSpeechRecognition();
  recognition.lang = "en-GB";
  recognition.addEventListener("result", (e) => {
    document.querySelector(".text").value = e.results[0][0].transcript;
    btn.classList.remove("fade");
  });
  recognition.start();
});
