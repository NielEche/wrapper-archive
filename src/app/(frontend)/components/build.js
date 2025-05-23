import { useState, useRef } from "react";
import Colorful from "@uiw/react-color-colorful";
import html2canvas from "html2canvas";
import styles from "./build.module.scss";
import Image from "next/legacy/image";

import img1 from "../../../assets/wrp1.jpg";
import img2 from "../../../assets/wrp2.jpg";
import img3 from "../../../assets/wrp3.jpg";

const cellSize = 15; // Grid cell size (px)
const colorOptions = [
    "#000000", // Black
    "#FFFFFF", // White
    "#FF5733", // Persimmon
    "#2980B9", // Deep Sky Blue
    "#FF0000", // Red
    "#964B00", // Brown
    "#800020", // Burgundy
    "#33FF57", // Spring Green
    "#3357FF", // Royal Blue
    "#F1C40F", // Bright Yellow
    "#8E44AD", // Purple
    "#E74C3C", // Tomato Red
    "#1ABC9C", // Turquoise
    "#D35400", // Pumpkin Orange
    "#2ECC71", // Emerald Green
    "#B0E0E6", // Powder Blue
    "#F88379", // Coral Pink
    "#191970", // Midnight Blue
    "#6B8E23", // Olive Drab
    "#DCAE96", // Dusty Rose
    "#9CAF88", // Sage Green
    "#FFF0F5", // Lavender Blush
    "#36454F", // Charcoal Gray
    "#B7410E", // Rust Orange
    "#1560BD", // Denim Blue
  ];
  
export default function Build() {
  const [loomDimensions] = useState({ width: 680, height: 480 });
  const [activeColors, setActiveColors] = useState({ foreground: "#000" });
  const [draggedImage, setDraggedImage] = useState(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [canvasImage, setCanvasImage] = useState(null);
  const [gridState, setGridState] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const loomRef = useRef(null);

  const changeCellBg = (event, cellId) => {
    if (!gridState[cellId]) {
      event.target.style.background = activeColors.foreground;
    }
  };

  
  const resetGrid = () => {
    setGridState({}); // Clear the grid state
    setSelectedImage(null); // Deselect any selected image
  
    // Reset all cell backgrounds manually
    document.querySelectorAll(`.${styles.cell}`).forEach((cell) => {
      cell.style.background = "#fff"; // Set background to white
      cell.style.backgroundImage = "none"; // Remove images
    });
  };

  const saveLoomAsImage = async () => {
    const canvas = await html2canvas(loomRef.current);
    const imageUrl = canvas.toDataURL("image/png");
    setCanvasImage(imageUrl);
    setIsModalOpen(true);

    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "loom.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  

  const handleColorSelect = (color) => {
    setActiveColors({ ...activeColors, foreground: color });
  };

  const handleDragStart = (img) => setDraggedImage(img);

  const handleDrop = (event, cellId) => {
    event.preventDefault();
    if (!draggedImage) return;

    const imgWidth = 5;
    const imgHeight = 5;

    const [row, col] = cellId.split("-").map(Number);

    setGridState((prev) => {
      const newGridState = { ...prev };

      for (let i = 0; i < imgHeight; i++) {
        for (let j = 0; j < imgWidth; j++) {
          const targetCell = `${row + i}-${col + j}`;
          newGridState[targetCell] = {
            img: draggedImage,
            offsetX: -j * cellSize,
            offsetY: -i * cellSize,
            parent: `${row}-${col}`,
          };
        }
      }

      return newGridState;
    });
  };

  

  const handleCellClick = (cellId) => {
    if (gridState[cellId]?.parent) {
      setSelectedImage((prevSelected) =>
        prevSelected === gridState[cellId].parent ? null : gridState[cellId].parent
      );
    }
  };

  const deleteSelectedImage = () => {
    if (!selectedImage) return;

    setGridState((prev) => {
      const newGridState = { ...prev };

      Object.keys(newGridState).forEach((key) => {
        if (newGridState[key]?.parent === selectedImage) {
          delete newGridState[key];
        }
      });

      return newGridState;
    });

    setSelectedImage(null);
  };

  const createGrid = () => {
    const cols = loomDimensions.width / cellSize;
    const rows = loomDimensions.height / cellSize;
    let grid = [];

    for (let i = 0; i < rows; i++) {
      let row = [];
      for (let j = 0; j < cols; j++) {
        const cellId = `${i}-${j}`;
        const cellData = gridState[cellId];

        const isSelected = selectedImage && cellData?.parent === selectedImage;

        row.push(
          <div
            key={cellId}
            className={`${styles.cell} ${isSelected ? styles.selected : ""}`}
            style={{
              width: `${cellSize}px`,
              height: `${cellSize}px`,
              backgroundColor: cellData?.img ? "transparent" : "#fff",
              backgroundImage: cellData?.img ? `url(${cellData.img.src})` : "none",
              backgroundSize: cellData?.img ? `${cellSize * 5}px ${cellSize * 5}px` : "cover",
              backgroundPosition: cellData ? `${cellData.offsetX}px ${cellData.offsetY}px` : "0 0",
              backgroundRepeat: "no-repeat",
              imageRendering: "pixelated",
            }}
            onClick={() => handleCellClick(cellId)}
            onMouseMove={(e) => isMouseDown && changeCellBg(e, cellId)}
            onMouseDown={() => setIsMouseDown(true)}
            onMouseUp={() => setIsMouseDown(false)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, cellId)}
          ></div>
        );
      }
      grid.push(
        <div key={i} className={styles.row}>
          {row}
        </div>
      );
    }
    return grid;
  };


  return (

    <>
    <div className={styles.container}>
      <div className={styles.controls}>

        <div className="relative group">
            <div className={styles.colorPickertext}>
                <p className="Oswald-Bold ">Pick a Color <i className="ml-2 cursor-pointer"> &#9432; </i></p>
                <div className="absolute z-[997] bg-off hidden group-hover:block text-black p-2 mx-4 rounded shadow-lg mt-1 text-sm">
                    Select a color and paint the loom grid to design pattern.
                </div>
            </div>
        </div>

    
        <div className="flex items-center justify-around border-b border-black">
            <div className={styles.colorPalette}>
            {colorOptions.map((color) => (
                <div
                key={color}
                className={styles.colorBox}
                style={{
                    backgroundColor: color,
                    border: activeColors.foreground === color ? "4px solid black" : "1px solid black",
                }}
                onClick={() => handleColorSelect(color)}
                ></div>
            ))}
            </div>

            <div className={styles.colorful}>
                <Colorful
                 style={{
                    width: "170px",
                    transform: "scale(0.6)",
                }}
                color={activeColors.foreground}
                onChange={(c) => setActiveColors({ ...activeColors, foreground: c.hex })}/>     
            </div>
        </div>


        <div className={styles.imagePicker}>
        
            <div className="relative group">
                <div className={styles.colorPickertext}>
                    <p className="Oswald-Bold ">Drag an Image <i className="ml-2 cursor-pointer"> &#9432; </i></p>
                    <div className="absolute z-[997] bg-off hidden group-hover:block text-black p-2 mx-4 rounded shadow-lg mt-1 text-sm">
                        Drag an image from the list and place on the loom grid. To delete, click on image on grid and delete.
                    </div>
                </div>
            </div>
    
          <div className={styles.imageOptions}>
            {[img1, img2, img3].map((img, index) => (
              <Image
                key={index}
                src={img}
                alt={`Option ${index + 1}`}
                width={50}
                height={50}
                className={styles.imageThumbnail}
                draggable
                onDragStart={() => handleDragStart(img)}
              />
            ))}
          </div>
        </div>

        <div className={styles.saveImage}>
           <button className={styles.saveButton} style={{ marginRight: "10px" }} >
                Eraser
            </button>
            <button className={styles.resetButton}  onClick={resetGrid}>
                Reset
            </button>
            <button className={styles.saveButton} onClick={saveLoomAsImage}>Save</button>
        </div>
  
      </div>

    {/* Loom Grid */}
    <div
    ref={loomRef}
    className={styles.loom}
    onMouseDown={() => setIsMouseDown(true)}
    onMouseUp={() => setIsMouseDown(false)}>
    {createGrid()}

    {/* Delete Button (Shows when an image is selected) */}
    {selectedImage && (
        <button className={styles.deleteButton} onClick={deleteSelectedImage}>
        Delete
        </button>
    )}

    </div>

    </div>


    <div>
        {/* Preview */}
        {isModalOpen && (
               <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999]">
                <div onClick={() => setIsModalOpen(false)}>
                <div onClick={(e) => e.stopPropagation()}>
                    <button className={styles.closeButton} onClick={() => setIsModalOpen(false)}>✖</button>
                    <Image src={canvasImage} width={500}
              height={500} alt="Generated Weave" className="w-[400px] mx-6" />
                </div>
                </div>
            </div>
        )}
    </div>
    </>
  );
}
