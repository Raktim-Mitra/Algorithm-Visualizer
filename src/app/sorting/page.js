
"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const page = () => {
    const [array, setArray] = useState([]);
    const [sorting, setSorting] = useState(false);
    const [selectedSort, setSelectedSort] = useState("bubble");
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    useEffect(() => {
        generateRandomArray();
    }, []);

    const generateRandomArray = () => {
        const randomArray = Array.from(
            { length: 20 },
            () => Math.floor(Math.random() * 50) + 1
        );
        setArray(randomArray);
    };
    
    const bubbleSort = async () => {
        setSorting(true);
        const arr = [...array];
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    // Swap elements
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    setArray([...arr]);
                    await sleep(100);
                }
            }
        }
        setSorting(false);
    };
    const selectionSort = async () => {
        setSorting(true);
        const arr = [...array];
        for (let i = 0; i < arr.length; i++) {
            let minIdx = i;
            for (let j = i + 1; j < arr.length; j++) {
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }
            if (minIdx !== i) {
                [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
                setArray([...arr]);
                await sleep(100);
            }
        }
        setSorting(false);
    };

    const insertionSort = async () => {
        setSorting(true);
        const arr = [...array];
        for (let i = 1; i < arr.length; i++) {
            let key = arr[i];
            let j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
                setArray([...arr]);
                await sleep(100);
            }
            arr[j + 1] = key;
            setArray([...arr]);
            await sleep(100);
        }
        setSorting(false);
    };
    const mergeSortArray = async () => {
        const arr = [...array];
      
        const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      
        const merge = async (arr, l, m, r) => {
          const n1 = m - l + 1;
          const n2 = r - m;
          const L = new Array(n1);
          const R = new Array(n2);
      
          for (let i = 0; i < n1; i++) L[i] = arr[l + i];
          for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
      
          let i = 0,
            j = 0,
            k = l;
      
          while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
              arr[k] = L[i];
              i++;
            } else {
              arr[k] = R[j];
              j++;
            }
            k++;
            setArray([...arr]); // Update state for visualization
            await sleep(300); // Delay for visualization
          }
      
          while (i < n1) {
            arr[k] = L[i];
            i++;
            k++;
            setArray([...arr]);
            await sleep(300);
          }
      
          while (j < n2) {
            arr[k] = R[j];
            j++;
            k++;
            setArray([...arr]);
            await sleep(300);
          }
        };
      
        const mergeSort = async (arr, l, r) => {
          if (l >= r) return;
          const m = l + Math.floor((r - l) / 2);
          await mergeSort(arr, l, m);
          await mergeSort(arr, m + 1, r);
          await merge(arr, l, m, r); // Await merge to ensure visualization
        };
      
        await mergeSort(arr, 0, arr.length - 1);
      };
    const quickSortArray = async () => {
        const arr = [...array];
        const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

        const partition = async (arr, low, high) => {
            const pivot = arr[high];
            let i = low - 1;
            for (let j = low; j < high; j++) {
                if (arr[j] < pivot) {
                    i++;
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                    setArray([...arr]);
                    await sleep(100);
                }
            }
            [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
            setArray([...arr]);
            await sleep(100);
            return i + 1;
        };

        const quickSort = async (arr, low, high) => {
            if (low < high) {
                const pi = await partition(arr, low, high);
                await quickSort(arr, low, pi - 1);
                await quickSort(arr, pi + 1, high);
            }
        }

        await quickSort(arr, 0, arr.length - 1);
    };
        
      
    const handleSort = async () => {
        setSorting(true);
        switch (selectedSort) {
            case "bubble":
                await bubbleSort();
                break;
            case "selection":
                await selectionSort();
                break;
            case "insertion":
                await insertionSort();
                break;
            case "merge":
                await mergeSortArray();
                break;    
            case "quick":
                await quickSortArray();
                break;    
            default:
                break;
        }
        setSorting(false);
    };
    const resetArray = () => {
        generateRandomArray();
    };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 w-full">
    <h1 className="text-4xl font-bold text-white mb-8">
        Sorting Visualizer
    </h1>
    <div className="flex space-x-4 mb-6 items-center">
        <Select
            onValueChange={(value) => setSelectedSort(value)}
            defaultValue="bubble"
        >
            <SelectTrigger className="bg-white text-black px-4 py-2 rounded">
                <SelectValue placeholder="Select a sort" />
            </SelectTrigger>
            <SelectContent className="bg-white text-black">
                <SelectGroup>
                    <SelectLabel>Sort Algorithm</SelectLabel>
                    <SelectItem
                        value="bubble"
                        className=" focus:bg-slate-500"
                    >
                        Bubble Sort
                    </SelectItem>
                    <SelectItem
                        value="selection"
                        className=" focus:bg-slate-500"
                    >
                        Selection Sort
                    </SelectItem>
                    <SelectItem
                        value="insertion"
                        className=" focus:bg-slate-500"
                    >
                        Insertion Sort
                    </SelectItem>
                    <SelectItem
                        value="merge"
                        className=" focus:bg-slate-500"
                    >
                        Merge Sort
                    </SelectItem>
                    <SelectItem
                        value="quick"
                        className=" focus:bg-slate-500"
                    >
                        Quick Sort
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
        <Button
            onClick={handleSort}
            disabled={sorting}
            className="bg-blue-500 text-white"
        >
            {sorting ? "Sorting..." : "Start Sorting"}
        </Button>
        <Button
            onClick={resetArray}
            disabled={sorting}
            className="bg-red-500 text-white"
        >
            Reset
        </Button>
    </div>
    <div className="flex items-end space-x-2 w-screen justify-center">
        {array.map((value, index) => (
            <div
                key={index}
                className="bg-green-500"
                style={{
                    height: `${value * 10}px`,
                    width: "36px",
                    transition: "all 0.3s ease",
                }}
            ></div>
        ))}
    </div>
</div>
  )
}

export default page