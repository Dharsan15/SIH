import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

// Establish connection with the server
const socket = io("http://localhost:3000");

const Home = () => {
  const [roomName, setRoomName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");

  useEffect(() => {
    // Receive text messages
    socket.on("message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Receive audio messages
    socket.on("receiveAudioMessage", (audioBuffer) => {
      const audioBlob = new Blob([audioBuffer], { type: "audio/webm" });
      const newAudioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(newAudioUrl);
      const audio = new Audio(newAudioUrl);
      audio.play();
    });

    return () => {
      socket.off("message");
      socket.off("receiveAudioMessage");
    };
  }, []);

  const joinRoom = () => {
    if (roomName) {
      socket.emit("joinRoom", roomName);
      setMessages([]);
    }
  };

  const leaveRoom = () => {
    if (roomName) {
      socket.emit("leaveRoom", roomName);
      setRoomName("");
      setMessages([]);
    }
  };

  const sendMessage = () => {
    if (roomName && message) {
      socket.emit("sendMessage", { roomName, message });
      setMessage("");
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
    setIsRecording(!isRecording);
  };

  let mediaRecorder;
  let audioChunks = [];

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = (event) => {
          audioChunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
          sendAudioMessage(audioBlob);
          audioChunks = [];
        };

        mediaRecorder.start();
      })
      .catch((error) => {
        console.error("Error accessing microphone", error);
      });
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
  };

  const sendAudioMessage = (audioBlob) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(audioBlob);
    reader.onloadend = () => {
      const audioBuffer = reader.result;
      socket.emit("sendAudioMessage", { roomName, audioBuffer });
    };
  };

  const playAudio = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-500">Socket.IO Group Chat</h1>
      <div className="mb-4 flex flex-col items-center">
        <input
          type="text"
          placeholder="Enter Room Name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md w-full max-w-xs mb-2"
        />
        <div className="flex gap-2">
          <button onClick={joinRoom} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Join Room
          </button>
          <button onClick={leaveRoom} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Leave Room
          </button>
        </div>
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md w-full max-w-xs"
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Send Message
        </button>
      </div>
      <div className="flex gap-2 mb-4 items-center">
        <button
          onClick={toggleRecording}
          className={`bg-${isRecording ? "red" : "purple"}-500 hover:bg-${
            isRecording ? "red" : "purple"
          }-700 text-white font-bold py-2 px-4 rounded`}
        >
          {isRecording ? "Stop Recording" : "Start Recording"}
        </button>
        {audioUrl && (
          <button onClick={playAudio} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Play Last Recording
          </button>
        )}
      </div>
      <ul className="bg-gray-100 p-4 rounded-md shadow-md mt-4">
        {messages.map((msg, index) => (
          <li key={index} className="py-2 text-gray-700">
            {msg}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
