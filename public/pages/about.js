const About = {
    render: async ()=>{
        let view = `
        <section class="section">
            <h1>About</h1>
        </section>`
        return view
    },
    after_render: async ()=>{
        document.getElementById("myBtn").addEventListener("click",()=>{
            console.log("hi");
        })
    }
}

export default About;