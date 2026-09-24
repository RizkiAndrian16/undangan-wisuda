(function () {
    const audio = document.getElementById("bgMusic");
    const btn = document.getElementById("musicToggle");

    if (!audio || !btn) return;

    audio.volume = 0.6;


    /* =====================================================
       UPDATE TAMPILAN TOMBOL MUSIK
    ===================================================== */

    function setPlayingUI(isPlaying) {
        if (isPlaying) {
            btn.classList.add("is-playing");
            btn.setAttribute("aria-pressed", "true");
            btn.setAttribute("aria-label", "Jeda musik");
        } else {
            btn.classList.remove("is-playing");
            btn.setAttribute("aria-pressed", "false");
            btn.setAttribute("aria-label", "Putar musik");
        }
    }


    /* =====================================================
       BUKA UNDANGAN & PUTAR MUSIK
    ===================================================== */

    const cover = document.getElementById("invitationCover");
    const openBtn = document.getElementById("openInvitationBtn");

    if (openBtn && cover) {
        openBtn.addEventListener("click", function () {

            /* Putar musik */
            if (audio.paused) {
                audio.play()
                    .then(function () {
                        setPlayingUI(true);
                    })
                    .catch(function (error) {
                        console.log("Gagal memutar musik:", error);
                    });
            }


            /* Animasi buka cover */
            cover.classList.add("is-opened");


            /* Hilangkan status cover */
            document.body.classList.remove("cover-active");


            /* Halaman 1 tampil tetapi scroll masih dikunci */
            document.documentElement.classList.add("page-one-locked");
            document.body.classList.add("page-one-locked");


            /* Pastikan posisi kembali ke paling atas */
            window.scrollTo(0, 0);


            /* Hilangkan cover setelah animasi selesai */
            setTimeout(function () {
                cover.style.display = "none";
            }, 1000);
        });
    }


    /* =====================================================
       RESET SCROLL & HASH
       AGAR REFRESH SELALU MULAI DARI SAMPUL
    ===================================================== */

    if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
    }


    if (window.location.hash) {
        history.replaceState(
            null,
            "",
            window.location.pathname + window.location.search
        );
    }


    window.scrollTo(0, 0);


    window.addEventListener("beforeunload", function () {
        window.scrollTo(0, 0);
    });


    /* =====================================================
       TOMBOL LIHAT DETAIL
       SCROLL HALUS KE HALAMAN 2
    ===================================================== */

    const seeDetailsBtn = document.getElementById("btnSeeDetails");
    const pageTwo = document.getElementById("pageTwo");

    if (seeDetailsBtn && pageTwo) {

        seeDetailsBtn.addEventListener("click", function (event) {

            event.preventDefault();

            const pageOne = document.querySelector(".page-one");


            /* Efek Page 1 keluar */
            if (pageOne) {
                pageOne.classList.add("is-leaving");
            }


            /* Buka scroll */
            document.documentElement.classList.remove("page-one-locked");
            document.body.classList.remove("page-one-locked");


            /* Pastikan halaman dapat discroll */
            document.documentElement.style.overflowY = "auto";
            document.body.style.overflowY = "auto";

            document.documentElement.style.height = "auto";
            document.body.style.height = "auto";


            /* Reset animasi Page 2 */
            pageTwo.classList.remove("detail-enter");


            /* Jalankan animasi masuk Page 2 */
            requestAnimationFrame(function () {

                pageTwo.classList.add("detail-enter");


                /* Scroll halus ke Page 2 */
                pageTwo.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            });


            /* Hilangkan tombol Lihat Detail secara halus */
            seeDetailsBtn.classList.add("is-hidden");


            setTimeout(function () {
                seeDetailsBtn.style.display = "none";
            }, 450);


            /*
               Setelah animasi selesai,
               kembalikan Page 1 ke kondisi normal.
               Page 1 tetap bisa dilihat lagi
               jika user scroll ke atas.
            */
            setTimeout(function () {

                if (pageOne) {
                    pageOne.classList.remove("is-leaving");
                }

                pageTwo.classList.remove("detail-enter");

            }, 1000);
        });
    }

    /* =====================================================
       TOMBOL MUSIK ON / OFF
    ===================================================== */

    btn.addEventListener("click", function (event) {

        /*
           Supaya klik tombol musik
           tidak dianggap sebagai
           first interaction listener.
        */

        event.stopPropagation();


        if (audio.paused) {

            audio.play()
                .then(function () {

                    setPlayingUI(true);

                })
                .catch(function (error) {

                    console.log(
                        "Musik gagal diputar:",
                        error
                    );
                });

        } else {

            audio.pause();

            setPlayingUI(false);
        }
    });


    /* =====================================================
       UPDATE ICON JIKA STATUS AUDIO BERUBAH
    ===================================================== */

    audio.addEventListener("play", function () {
        setPlayingUI(true);
    });


    audio.addEventListener("pause", function () {
        setPlayingUI(false);
    });

    /* =====================================================
   ANIMASI MASUK MAP CARD
===================================================== */

    const mapCard = document.querySelector(".map-card");

    if (mapCard) {

        /* Aktifkan kondisi awal animasi */
        mapCard.classList.add("map-animate");

        const mapObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        mapCard.classList.add("is-visible");

                        /* Animasi cukup sekali */
                        observer.unobserve(mapCard);
                    }
                });
            },
            {
                threshold: 0.2,
                rootMargin: "0px 0px -8% 0px"
            }
        );

        mapObserver.observe(mapCard);
    }

})();