function toggleSection(sectionId) {
  const content = document.getElementById(sectionId);
  const arrow = document.getElementById("arrow-" + sectionId);

  if (content.style.display === "none") {
    content.style.display = "block";
    arrow.textContent = "▼";
  } else {
    content.style.display = "none";
    arrow.textContent = "▲";
  }
}

// By default, show all sections
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("voice-samples").style.display = "block";
  document.getElementById("dubbing").style.display = "block";
});

fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    const voiceSection = document.getElementById("voiceSamples");
    const dubbingSection = document.getElementById("dubbingSamples");

    data.voiceSamples.forEach((video) => {
      const card = createVideoCard(video, "voiceover");
      voiceSection.appendChild(card);
    });

    data.dubbingSamples.forEach((video) => {
      const card = createVideoCard(video, "dubbing");
      dubbingSection.appendChild(card);
    });
  })
  .catch((err) => console.error("Failed to load data:", err));

function createVideoCard(video, type) {
  const card = document.createElement("div");
  card.className = "video-card";
  const iframe = document.createElement("iframe");
  if (type === "voiceover") {
    iframe.className = "video-frame";
    iframe.src = video.url;
    iframe.allowFullscreen = true;
    iframe.frameborder = "0";
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
  }
  else{
    iframe.src = video.url;
    iframe.allow = "autoplay";
  }

  const caption = document.createElement("div");
  caption.className = "video-caption";
  caption.textContent = video.title;

  card.appendChild(iframe);
  card.appendChild(caption);

  return card;
}
