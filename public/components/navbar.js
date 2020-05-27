let Navbar = {
    render: async () => {
        let view = `
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="#">Scheduler</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="#interviews">Interviews <span class="sr-only">(current)</span></a>
                    </li>
                </ul>
                <ul class="navbar-nav my-2 my-lg-0">
                    <li class="nav-item active">
                        <span id="username"></span>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="#register">Register <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="#login">Login <span class="sr-only">(current)</span></a>
                    </li>
                </ul>
                </form>
            </div>
        </nav>
        `
        return view
    },
    after_render: async () => { }

}

export default Navbar;