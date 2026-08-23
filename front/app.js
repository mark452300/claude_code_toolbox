const states = [
    {
        key: "idle",
        latency: "0.38",
        tone: "温和专业",
        camera: "稳定跟拍",
        speech: "稳定输出",
        width: "42%",
        title: "欢迎来到 Runwai 数字人演示",
        text: "我会以更自然的方式介绍产品能力、引导用户理解价值，并保持一种清晰、冷静的表达节奏。"
    },
    {
        key: "speaking",
        latency: "0.21",
        tone: "清晰讲解",
        camera: "轻微推进",
        speech: "表达增强",
        width: "74%",
        title: "当前正在进行产品讲解",
        text: "现在的语气更主动，适合用来介绍产品卖点、方案差异和使用收益，节奏更紧凑。"
    },
    {
        key: "thinking",
        latency: "0.47",
        tone: "审慎分析",
        camera: "轻度停顿",
        speech: "组织回答",
        width: "56%",
        title: "数字人进入思考模式",
        text: "适合复杂问答、方案比较和需要停顿组织语言的场景，强调可靠与克制。"
    },
    {
        key: "inviting",
        latency: "0.19",
        tone: "邀请互动",
        camera: "面向用户",
        speech: "转化引导",
        width: "88%",
        title: "邀请用户进入下一步动作",
        text: "这一状态更适合预约咨询、引导注册或推动进一步沟通，姿态更开放，表达更明确。"
    }
]

const nodes = {
    latency: document.getElementById("latency"),
    tone: document.getElementById("tone"),
    camera: document.getElementById("cameraState"),
    speech: document.getElementById("speechState"),
    title: document.getElementById("scriptTitle"),
    text: document.getElementById("scriptText"),
    meter: document.getElementById("meterBar"),
    start: document.getElementById("startDemo"),
    change: document.getElementById("changeMood")
}

let index = 0

function applyState(nextIndex) {
    const state = states[nextIndex]
    document.body.dataset.mood = state.key
    nodes.latency.textContent = state.latency
    nodes.tone.textContent = state.tone
    nodes.camera.textContent = state.camera
    nodes.speech.textContent = state.speech
    nodes.title.textContent = state.title
    nodes.text.textContent = state.text
    nodes.meter.style.width = state.width
    index = nextIndex
}

function nextState() {
    const nextIndex = (index + 1) % states.length
    applyState(nextIndex)
}

nodes.start.addEventListener("click", () => {
    applyState(1)
    document.getElementById("studio").scrollIntoView({ behavior: "smooth", block: "start" })
})

nodes.change.addEventListener("click", nextState)

const observer = new IntersectionObserver(
    entries => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible")
            }
        }
    },
    { threshold: 0.18 }
)

for (const element of document.querySelectorAll(".reveal")) {
    observer.observe(element)
}

applyState(0)