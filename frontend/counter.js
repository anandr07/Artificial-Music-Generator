import abcjs from "abcjs";

export function setupCounter(element) {
    let loading = false;

    const setLoading = () => {
        if (loading) return;
        loading = true;

        element.innerHTML = '<div id="loader"></div>';
        let load_div = document.querySelector('#loader');
        let list_div = document.querySelector('.list');
        let buttonDiv = document.createElement('div');
        buttonDiv.classList.add('buttonDiv');
        load_div.classList.add('loading-pulse');

        fetch('http://localhost:5000/generate')
            .then(response => response.text())
            .then(responseText => {
                let cleanedText = cleanABCNotation(responseText);
                let tunes = cleanedText.split('\n\n'); // Assuming each tune is separated by a double newline

                tunes.forEach((tune, index) => {
                    let div = document.createElement('div');
                    let divid = 'abc' + index;
                    div.id = divid;
                    list_div.appendChild(div);

                    abcjs.renderAbc(divid, tune);

                    let audioContext = new AudioContext();
                    let synth = new abcjs.synth.CreateSynth();

                    synth.init({
                        audioContext: audioContext,
                        visualObj: abcjs.renderAbc(divid, tune)[0],
                        millisecondsPerMeasure: 500,
                    }).then(() => {
                        synth.prime().then(() => {
                            let playButton = document.createElement('button');
                            playButton.style.margin = '10px';
                            playButton.innerText = "Start " + index;
                            buttonDiv.appendChild(playButton);
                            list_div.appendChild(buttonDiv);

                            playButton.addEventListener('click', Start);

                            function Start() {
                                synth.start();
                                playButton.removeEventListener("click", Start);
                                playButton.addEventListener("click", Stop);
                                playButton.innerText = "Stop " + index;
                            }

                            function Stop() {
                                synth.stop();
                                playButton.removeEventListener("click", Stop);
                                playButton.addEventListener("click", Start);
                                playButton.innerText = "Start " + index;
                            }
                        });
                    }).catch(reason => {
                        console.error(reason);
                    });
                });

                load_div.classList.remove('loading-pulse');
                load_div.remove();
                element.innerHTML = 'Generate';
            })
            .catch(error => {
                element.innerHTML = 'Generate';
                list_div.innerHTML = 'Error: ' + error;
                list_div.classList.add('error');
                console.error('Error:', error);
            })
            .finally(() => {
                loading = false;
            });
    };

    element.addEventListener('click', () => { setLoading(); });
}

function cleanABCNotation(text) {
    // Remove leading and trailing whitespace
    text = text.trim();

    // Normalize line endings
    text = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

    // Remove any non-ABC notation characters (like control characters)
    text = text.replace(/[^\x20-\x7E\n]/g, '');

    // Ensure proper spacing around field headers (e.g., "K:", "M:", etc.)
    text = text.replace(/([A-Z]):/g, '\n$1:');

    // Remove any duplicate newlines
    text = text.replace(/\n{2,}/g, '\n\n');

    // Ensure that each header section is properly separated by a newline
    text = text.replace(/(\nX: \d+)\n([A-Z]:)/g, '$1\n\n$2');

    return text;
}
