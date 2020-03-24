<template>
    <div class="emoji-css">
        😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 🥰 😗 😙 😚 ☺️ 🙂 🤗 🤩 🤔 🤨 😐 😑 😶 🙄 😏 😣 😥 😮 🤐 😯 😪 😫 😴
        😌 😛 😜 😝 🤤 😒 😓 😔 😕 🙃 🤑 😲 ☹️ 🙁 😖 😞 😟 😤 😢 😭 😦 😧 😨 😩 🤯 😬 😰 😱 🥵 🥶 😳 🤪 😵 😡 😠 🤬 😷
        🤒 🤕 🤢 🤮 🤧 😇 🤠 🤡 🥳 🥴 🥺 🤥 🤫 🤭 🧐 🤓 😈 👿 👹 👺 💀 👻 👽 🤖 💩 😺 😸 😹 😻 😼 😽 🙀 😿 😾
    </div>
</template>

<script>
    export default {
        name: "my-demo"
    }
</script>

<style scoped>
    @font-face {
        font-family: "my-emoji";
        src: local("Apple Color Emoji"),
        local("Android Emoji"),
        local("Segoe UI Emoji"),
        local("Segoe UI Symbol"),
        local("Noto Color Emoji");
        unicode-range: U+1F300-1F5FF, U+1F600-1F64F, U+1F680-1F6FF, U+2600-26FF;
    }

    .emoji-css {
        font-family: "my-emoji";
    }
</style>