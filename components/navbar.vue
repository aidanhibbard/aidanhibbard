<template>
    <header>
        <nav>
            <ul>
                <li class="logo"><a href="/" class="logo-link"><span>{{ '<' }}</span>aidan-hibbard <span>{{ '/>' }}</span></a></li>
                <li><a href="/articles" class="navbar-link">Articles</a></li>
                <li><a href="/projects" class="navbar-link">Projects</a></li>
                <li><a href="/about" class="navbar-link">About</a></li>
                <li><a href="/resume" class="navbar-link">Resume</a></li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    ul {
        list-style: none;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        flex-basis: 0;
    }
    ul li {
        flex-grow: 1;
    }
    ul li a {
        font-size: clamp(1.1em, 1.2em, 1.3em);
        text-decoration: none;
        display: block;
        height: 100%;
        text-align: center;
        line-height: 70px;
        transition: 0.5s;
    }
    ul li a:hover {
        color: darkcyan;
    }
    .logo-link {
        font-size: clamp(1.5em, 1.6em, 1.8em);
        color: turquoise;

    }
    /* Brackets */
    .logo span {
        color: slategray;
    }
    .navbar-link {
        color: whitesmoke;
    }
</style>
