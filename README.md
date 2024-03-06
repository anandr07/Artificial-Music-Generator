# Artificial Music Generator

## Overview

This project implements an Artificial Music Generator using LSTM (Long Short-Term Memory) networks, a type of recurrent neural network (RNN). The system generates music character by character based on a given input dataset. The core idea is to train an LSTM model on a corpus of music data and then sample from the trained model to generate new music compositions.

## Implementation

### File Structure

- **train.py**: Python script for training the CharRNN model.
- **model.py**: Contains the definition of the LSTM model used for music generation.
- **sample.py**: Python script for sampling text (music) from the trained model.
- **data/**: Directory containing input data and related files.
  - **char_to_idx.json**: JSON file mapping characters to their corresponding indices.
  - **input.txt**: Text file containing input music data.
- **logs/**: Directory for storing training logs.
  - **training_log.csv**: CSV file containing training logs such as loss and accuracy.
- **model/**: Directory for storing model weights.
  - **weights.X.h5**: HDF5 files storing model weights for different epochs.
- **pycache/**: Directory containing cached Python files.

### Functionality

- **Training**: The `train.py` script trains the CharRNN model using the provided input data. It reads the input text, preprocesses it, builds the LSTM model, and trains it over multiple epochs. Training progress is logged in the `training_log.csv` file, and model weights are saved in the `model/` directory.

- **Model Definition**: The `model.py` module contains the definition of the LSTM model architecture. It defines functions to save and load model weights, as well as to build the model architecture using Keras.

- **Sampling**: The `sample.py` script samples music from the trained CharRNN model. It loads the trained model weights, prepares the input seed, and generates new music sequences character by character.

## Usage

1. **Setup**: Clone the repository and install the required dependencies listed in the `requirements.txt` file.

2. **Training**: Run the `train.py` script to train the CharRNN model on your music dataset. You can adjust hyperparameters such as batch size, sequence length, and number of epochs as needed.

3. **Sampling**: Once the model is trained, use the `sample.py` script to generate new music compositions. Specify the trained model epoch, seed text (optional), and the desired length of the generated music sequence.

4. **Exploration**: Explore the generated music sequences and experiment with different model architectures and training strategies to improve the quality of generated music.

## Contribution

Contributions are welcome! Feel free to fork the repository, make improvements, and submit pull requests. If you encounter any issues or have suggestions for enhancements, please open an issue on GitHub.

## License

Not yet Licensed

---

Replace `link-to-license` with the actual link to your license file. Adjust the content and formatting as needed to fit your project's specifics.
