import abcjs from "abcjs";

export function setupCounter(element) {
    let loading = false
    const setLoading = () => {
        element.innerHTML = '<div  id="loader" ></div>'
        loading = true
        let load_div = document.querySelector('#loader')
        let list_div = document.querySelector('.list')
        let buttonDiv = document.createElement('div')
        buttonDiv.classList.add('buttonDiv')
        load_div.classList.add('loading-pulse')
        let abc = [
            "T: Cooley's\n" +
            "M: 4/4\n" +
            "Q: 1/4=120\n" +
            "L: 1/8\n" +
            "R: reel\n" +
            "K: Emin\n" +
            "|:{E}D2|EB{c}BA B2 EB|~B2 AB dBAG|FDAD BDAD|FDAD dAFD|\n" +
            "EBBA B2 EB|B2 AB defg|afe^c dBAF|DEFD E2:|\n" +
            "|:gf|eB B2 efge|eB B2 gedB|A2 FA DAFA|A2 FA defg|\n" +
            "eB B2 eBgB|eB B2 defg|afe^c dBAF|DEFD E2:|",

            "X:1\n" +
            "T:Bill Bailey\n" +
            "M:4/4\n" +
            "L:1/4\n" +
            "Q:1/4=210\n" +
            "K:C\n" +
            "\"C\"GA2c|e3/2^d/2eg|GA2c|e4|GA2c|e2g2|\"G7\"(gB3-|B4)|\n" +
            "GB2d|fefg|GB2d|f4|GB2d|g2\"G+\"a2|\"C\"(ae3-|e4)|\n" +
            "GA2c|e3/2^d/2eg|GA2c|e3G|GGce|g2_b2|\"F\"a2-a2-|a3c|\n" +
            "cc2c|\"F#dim7\"d2c2|\"C\"gg2a|\"A7\"e3e|\"D7\"ed^cd|\"G7\"f2e2|\"C\"c4-|czz2|]",

            "X:1\n" +
            "T:All Notes On Piano\n" +
            "M:4/4\n" +
            "Q:120\n" +
            "L:1/4\n" +
            "K:C clef=bass\n" +
            "A,,,,^A,,,,B,,,,C,,,|^C,,,D,,,^D,,,E,,,|F,,,^F,,,G,,,^G,,,|A,,,^A,,,B,,,C,,|\n" +
            "^C,,D,,^D,,E,,|F,,^F,,G,,^G,,|A,,^A,,B,,C,|^C,D,^D,E,|\n" +
            "K:C clef=treble\n" +
            "F,^F,G,^G,|A,^A,B,C|^CD^DE|F^FG^G|\n" +
            "A^ABc|^cd^de|f^fg^g|a^abc'|\n" +
            "^c'd'^d'e'|f'^f'g'^g'|a'^a'b'c''|^c''d''^d''e''|\n" +
            "f''^f''g''^g''|a''^a''b''c'''|^c'''4|]"
        ];

        





        fetch('http://locahost:8080/generate')
            .then(response => response.json())
            .then(json => {
                json.forEach(item => {
                    let div = document.createElement('div')
                    let divid = 'abc' + abc.indexOf(item)
                    div.id = divid
                    list_div.appendChild(div)
                })
                // wait for 2 seconds
                setTimeout(() => {
                    json.forEach(item => {
                        let divid = 'abc' + json.indexOf(item)
                        let renderObj = abcjs.renderAbc(divid, item)
                        var audioContext = new AudioContext();
                        var synth = new abcjs.synth.CreateSynth;

                        synth.init({
                            audioContext: audioContext,
                            visualObj: renderObj[0],
                            millisecondsPerMeasure: 500,

                        }).then(function (results) {
                            synth.prime().then((response) => {
                                console.log(response.status);
                                let playButton = document.createElement('button')
                                playButton.style.margin = '10px'
                                playButton.innerText = "Start" + abc.indexOf(item)
                                
                                buttonDiv.appendChild(playButton)
                                list_div.appendChild(buttonDiv)

                                playButton.addEventListener('click', Start)

                                function Start(){
                                    synth.start();
                                    playButton.removeEventListener("click", Start);
                                    playButton.addEventListener("click", Stop);
                                    playButton.innerText = "Stop" + abc.indexOf(item);
                                }
                                
                                function Stop(){
                                    synth.stop();
                                    playButton.removeEventListener("click", Stop);
                                    playButton.addEventListener("click", Start);
                                    playButton.innerText = "Start" + abc.indexOf(item);
                                }

                            });
                        }).catch(function (reason) {
                            console.log(reason)
                        });
                    });
                    load_div.classList.remove('loading-pulse')
                    load_div.remove()
                    element.innerHTML = 'Generate';
                }, 2000)
            })
            .catch(error => {
                element.innerHTML = 'Generate';
                list_div.innerHTML = 'Error: ' + error
                list_div.classList.add('error')
                console.error('Error:', error)
            })
            .finally(() => {
                loading = false
            })
    }
    element.addEventListener('click', () => { setLoading() })
}
