#%%[markdown]
# Script to Train the CharRNN Model (Train.py)

#%%
# Importing necessary libraries 
import os
import json
import argparse

import numpy as np

from model import build_model, save_weights

#%%
# Defining data directory and logging directory
DATA_DIR = './data'
LOG_DIR = './logs'

# Defining batch size and sequence length
BATCH_SIZE = 16
SEQ_LENGTH = 64

#%%
# Class for logging training progress
class TrainLogger(object):
    def __init__(self, file):
        # Initialize logger with file path and initial epochs
        self.file = os.path.join(LOG_DIR, file)
        self.epochs = 0
        # Write header to the log file
        with open(self.file, 'w') as f:
            f.write('epoch,loss,acc\n')

    def add_entry(self, loss, acc):
        # Increment epochs and add entry to the log file
        self.epochs += 1
        s = '{},{},{}\n'.format(self.epochs, loss, acc)
        with open(self.file, 'a') as f:
            f.write(s)

#%%
# Function to generate batches of input-output pairs for training
def read_batches(T, vocab_size):
    length = T.shape[0]; #129,665
    batch_chars = int(length / BATCH_SIZE); # 8,104

    for start in range(0, batch_chars - SEQ_LENGTH, SEQ_LENGTH): # (0, 8040, 64)
        X = np.zeros((BATCH_SIZE, SEQ_LENGTH)) # 16X64
        Y = np.zeros((BATCH_SIZE, SEQ_LENGTH, vocab_size)) # 16X64X86
        for batch_idx in range(0, BATCH_SIZE): # (0,16)
            for i in range(0, SEQ_LENGTH): #(0,64)
                X[batch_idx, i] = T[batch_chars * batch_idx + start + i] # 
                Y[batch_idx, i, T[batch_chars * batch_idx + start + i + 1]] = 1
        yield X, Y

#%%
# Function to train the CharRNN model
def train(text, epochs=100, save_freq=10):

    # Character to index and vice-versa mappings
    char_to_idx = { ch: i for (i, ch) in enumerate(sorted(list(set(text)))) }
    print("Number of unique characters: " + str(len(char_to_idx))) #86

    # Save character to index mapping to file
    with open(os.path.join(DATA_DIR, 'char_to_idx.json'), 'w') as f:
        json.dump(char_to_idx, f)

    # Create index to character mapping
    idx_to_char = { i: ch for (ch, i) in char_to_idx.items() }
    vocab_size = len(char_to_idx)

    # Build model architecture
    model = build_model(BATCH_SIZE, SEQ_LENGTH, vocab_size)
    model.summary()
    model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

    # Convert input text into numerical indices
    T = np.asarray([char_to_idx[c] for c in text], dtype=np.int32) #convert complete text into numerical indices

    print("Length of text:" + str(T.size)) #129,665

    steps_per_epoch = (len(text) / BATCH_SIZE - 1) / SEQ_LENGTH  

    # Initialize training logger
    log = TrainLogger('training_log.csv')

    # Iterate over epochs
    for epoch in range(epochs):
        print('\nEpoch {}/{}'.format(epoch + 1, epochs))

        # Initialize lists for storing losses and accuracies
        losses, accs = [], []

        # Iterate over batches
        for i, (X, Y) in enumerate(read_batches(T, vocab_size)):
            print(X)

            # Train the model on the current batch
            loss, acc = model.train_on_batch(X, Y)
            print('Batch {}: loss = {}, acc = {}'.format(i + 1, loss, acc))
            losses.append(loss)
            accs.append(acc)

        # Add average loss and accuracy to the training log
        log.add_entry(np.average(losses), np.average(accs))

        # Save model weights at specified frequency
        if (epoch + 1) % save_freq == 0:
            save_weights(epoch + 1, model)
            print('Saved checkpoint to', 'weights.{}.h5'.format(epoch + 1))

# %%
# Execute the training process
if __name__ == '__main__':
    # Parse command-line arguments
    input_file = 'input.txt'
    epochs = 100
    freq = 10

    # Create logging directory if it doesn't exist
    if not os.path.exists(LOG_DIR):
        os.makedirs(LOG_DIR)

    # Read input data and start training
    train(open(os.path.join(DATA_DIR, input_file)).read(), epochs, freq)

# %%
