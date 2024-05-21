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

