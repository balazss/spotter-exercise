import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  await Promise.all(
    getProducts().map((product) => {
      // We build a new product object with the data from the product object
      // and we clean all the keys and values with the camelCase function and the cleanPrice.
      const cleanedProduct = Object.entries(product).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [camelCase(key)]: cleanPrice(value),
        }),
        {}
      );

      return db.product.create({
        data: cleanedProduct,
      });
    })
  );
}

// A function that takes a string and if it's kebab-case then returns it in camelCase.
// If it's not kebab-case then it returns the string as is.
function camelCase(str) {
  if (str.includes("-")) {
    const [first, ...rest] = str.split("-");
    return [first, ...rest.map((word) => word[0].toUpperCase() + word.slice(1))]
      .join("")
      .replace(/ /g, "");
  }
  return str;
}

// Function that takes an argument and check if it has a dollar sign.
// If it has a dollar sign then it returns a Number with 2 decimals without the dollar sign.
// If it doesn't have a dollar sign then it returns the argument as is.
function cleanPrice(price) {
  if (price && price.includes("$")) {
    // Strip the commas and dollar sign
    const cleanPrice = price.replace(/,/g, "").replace("$", "");
    // Convert to a number and round to 2 decimals
    const number = Number(cleanPrice);
    return number;
  }
  return price;
}

seed();

function getProducts() {
  return [
    {
      title:
        "Dell OptiPlex Computer Desktop PC, Intel Core i5 3rd Gen 3.2 GHz, 16GB RAM, 2TB HDD, MTG, 22 Inch LED Monitor, RGB Keyboard and Mouse, WiFi, Windows 10 Pro (Renewed)",
      price: "$257.73",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/71qvwOcghiL._AC_UY218_.jpg",
      vendor: "Dell",
    },
    {
      title:
        "HP ProDesk 600 G1 SFF Slim Business Desktop Computer, Intel i5-4570 up to 3.60 GHz, 8GB RAM, 500GB HDD, DVD, USB 3.0, Windows 10 Pro 64 Bit (Renewed) (8GB RAM | 500GB HDD) (Renewed)",
      price: "$94.85",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/61LJRkUy7bS._AC_UY218_.jpg",
      vendor: "HP",
    },
    {
      title:
        "HP Elite 800G1 Desktop Computer Package - Intel Quad Core i5 3.3GHz, 16GB RAM, 240GB SSD 2TB HDD, Windows 10 Pro, Dual 19 inch Monitors, Keyboard, Mouse (Renewed)",
      price: "$249.99",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/712ASxPbZqL._AC_UY218_.jpg",
      vendor: "HP",
    },
    {
      title:
        "HP 2020 Flagship 14 Chromebook Laptop Computer 14-inch HD SVA Anti-Glare Display Intel Celeron N5000 Processor 4GB DDR4 64GB eMMC WiFi Webcam Chrome OS (Renewed)",
      price: "$129.99",
      "striked-price": "$247.89",
      image: "https://m.media-amazon.com/images/I/817Y3zdhTXL._AC_UY218_.jpg",
      vendor: "HP",
    },
    {
      title:
        "2020 Apple MacBook Air Laptop: Apple M1 Chip, 13 Retina Display, 8GB RAM, 256GB SSD Storage, Backlit Keyboard, FaceTime HD Camera, Touch ID. Works with iPhone/iPad; Silver",
      price: "$799.99",
      "striked-price": "$999.00",
      image: "https://m.media-amazon.com/images/I/71TPda7cwUL._AC_UY218_.jpg",
      vendor: "Apple",
    },
    {
      title:
        '2022 HP 14" HD Laptop, Windows 11, Intel Celeron Dual-Core Processor Up to 2.80GHz, 4GB RAM, 64GB SSD, Chromes OS, Cobalt Blue (Renewed)',
      price: "$189.80",
      "striked-price": "$199.99",
      image: "https://m.media-amazon.com/images/I/61Y6qYNGslL._AC_UY218_.jpg",
      vendor: "HP",
    },
    {
      title:
        "Dell Desktop Computer Package Compatible with Dell Optiplex 7010 Intel Quad Core i5 3.2GHz, 8GB Ram, 500GB HDD, 19-inch LCD, DVD, WiFi, Keyboard, Mouse, Windows 10 Pro (Renewed)",
      price: "$133.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/71IrtnjZD2L._AC_UY218_.jpg",
      vendor: "Dell",
    },
    {
      title:
        "HP Elite Desktop PC Computer Intel Core i5 3.1-GHz, 8 gb Ram, 1 TB Hard Drive, DVDRW, 19 Inch LCD Monitor, Keyboard, Mouse, Wireless WiFi, Windows 10 (Renewed)",
      price: "$133.00",
      "striked-price": "$149.00",
      image: "https://m.media-amazon.com/images/I/718sn7oOcfL._AC_UY218_.jpg",
      vendor: "HP",
    },
    {
      title:
        "HP Elite Desktop Computer PC, 3.1 GHz, Intel Core i5, 16GB, RAM, 2TB HDD, New 22 inch LED Monitor, RGB Speaker and Keyboard Mouse, WiFi, Windows 10 Pro (Renewed)",
      price: "$242.05",
      "striked-price": "$286.75",
      image: "https://m.media-amazon.com/images/I/71sNznE8HZL._AC_UY218_.jpg",
      vendor: "HP",
    },
    {
      title:
        "Portable Monitor SVANTTO [2022 Latest] FHD 15.6'' Portable Screen for Laptop 400Nits Brightness Travel Monitor, 100% sRGB 1080P Laptop Monitor Extender, Mac Xbox PS5 Computer Display with HDMI Cable",
      price: "$118.99",
      "striked-price": "$149.99",
      image: "https://m.media-amazon.com/images/I/618O1Tz8gIL._AC_UY218_.jpg",
      vendor: "SVANTTO",
    },
    {
      title:
        "2018 Dell OptiPlex Desktop Complete Computer Package with DVD, WiFi, Windows 10 - Keyboard, Mouse, 19in LCD Monitor(Brands May Vary) (Renewed) - Multi-Language Support English/Spanish",
      price: "$124.34",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/61-nM+1Q0DL._AC_UY218_.jpg",
      vendor: "Dell",
    },
    {
      title:
        '2021 HP Stream 14" HD Laptop Computer, Intel Celeron N4020 Processor, 4GB RAM, 64GB eMMC, HD Audio, HD Webcam, Intel UHD Graphics 600, 1 Year Office, HDMI, Win 10S, Rose Gold, 32GB SnowBell USB Card',
      price: "$329.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/51tKugBLsQL._AC_UY218_.jpg",
      vendor: "HP",
    },
    {
      title:
        '2022 Newest Lenovo Ideapad 3 Laptop, 15.6" HD Touchscreen, 11th Gen Intel Core i3-1115G4 Processor, 8GB DDR4 RAM, 256GB PCIe NVMe SSD, HDMI, Webcam, Wi-Fi 5, Bluetooth, Windows 11 Home, Almond',
      price: "$367.80",
      "striked-price": "$959.00",
      image: "https://m.media-amazon.com/images/I/61QGMX0Qy6L._AC_UY218_.jpg",
      vendor: "Lenovo",
    },
    {
      title:
        "Dell Optiplex 9020 Small Form Factor Desktop with Intel Core i7-4770 Upto 3.9GHz, HD Graphics 4600 4K Support, 32GB RAM, 1TB SSD, DisplayPort, HDMI, Wi-Fi, Bluetooth - Windows 10 Pro (Renewed)",
      price: "$269.98",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/61pskHRSN2L._AC_UY218_.jpg",
      vendor: "Dell",
    },
    {
      title:
        "2022 Apple MacBook Pro Laptop with M2 chip: 13-inch Retina Display, 8GB RAM, 512GB SSD Storage, Touch Bar, Backlit Keyboard, FaceTime HD Camera. Works with iPhone and iPad; Silver",
      price: "$1,349.99",
      "striked-price": "$1,499.00",
      image: "https://m.media-amazon.com/images/I/61bX2AoGj2L._AC_UY218_.jpg",
      vendor: "Apple",
    },
    {
      title:
        "Dell Optiplex 9010 SFF Desktop Computer - Intel i7-3770 Upto 3.9GHz, AMD Radeon 1GB Graphics, 32GB RAM, 1TB SSD, DisplayPort, HDMI, DVI, DVD, Wi-Fi, Bluetooth, TDL - Windows 10 Pro (RENEWED)",
      price: "$249.95",
      "striked-price": "$269.99",
      image: "https://m.media-amazon.com/images/I/71h37mxNQmL._AC_UY218_.jpg",
      vendor: "Dell",
    },
    {
      title:
        'HP 22" All-in-One Desktop, AMD Athlon Silver 3050U Processor, AMD Radeon Graphics, 4 GB RAM, 256 GB SSD, Windows 11 Home (22-dd0210, Snow white)',
      price: "$439.97",
      "striked-price": "$479.99",
      image: "https://m.media-amazon.com/images/I/71o7xHVdQaL._AC_UY218_.jpg",
      vendor: "HP",
    },
    {
      title:
        'Dell OptiPlex Desktop Complete Computer Package with Windows 10 Home - Keyboard, Mouse, 17" LCD Monitor(brands may vary) (Renewed)',
      price: "$120.11",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/518mU6Oi6XL._AC_UY218_.jpg",
      vendor: "Dell",
    },
    {
      title:
        'HP All-in-One Desktop, 21.5" FHD Display, Intel Celeron J4025 Processor, 16GB DDR4 RAM, 512GB PCIe SSD, Webcam, Wi-Fi, HDMI, RJ-45, Wired Keyboard&Mouse, Windows 11 Home, White',
      price: "$599.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/91-CdWQGWAL._AC_UY218_.jpg",
      vendor: "HP",
    },
    {
      title:
        'Lenovo IdeaCentre 5i All-in-One Business Desktop, 23.8" FHD IPS Touchscreen, Intel Core i5-10400T, 64GB RAM, 1TB SSD, Webcam, HDMI, Wireless Keyboard&Mouse, Wireless Charger, Wi-Fi, Windows 11 Pro',
      price: "$1,209.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/81KDR9SR3WL._AC_UY218_.jpg",
      vendor: "Lenovo",
    },
    {
      title:
        "2020 Apple MacBook Air Laptop: Apple M1 Chip, 13 Retina Display, 8GB RAM, 256GB SSD Storage, Backlit Keyboard, FaceTime HD Camera, Touch ID. Works with iPhone/iPad; Silver",
      price: "$799.99",
      "striked-price": "$999.00",
      image: "https://m.media-amazon.com/images/I/71TPda7cwUL._AC_UY218_.jpg",
      vendor: "Apple",
    },
    {
      title:
        "Apple iMac 21.5in 2.7GHz Core i5 (ME086LL/A) All In One Desktop, 8GB Memory, 1TB Hard Drive, Mac OS X Mountain Lion (Renewed)",
      price: "$279.99",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/61HSC+pdpQL._AC_UY218_.jpg",
      vendor: "Apple",
    },
    {
      title:
        'Dell OptiPlex Desktop Complete Computer Package with Windows 10 Home - Keyboard, Mouse, 17" LCD Monitor(brands may vary) (Renewed)',
      price: "$120.11",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/518mU6Oi6XL._AC_UY218_.jpg",
      vendor: "Dell",
    },
    {
      title:
        "HP EliteDesk 800 G1 SFF High Performance Business Desktop Computer, Intel Quad Core i5-4590 upto 3.7GHz, 16GB RAM, 1TB HDD, 256GB SSD (boot), DVD, WiFi, Windows 10 Professional (Renewed)",
      price: "$144.02",
      "striked-price": "$204.98",
      image: "https://m.media-amazon.com/images/I/61PLUeR9MoS._AC_UY218_.jpg",
      vendor: "HP",
    },
    {
      title:
        "Acer Aspire TC-1760-UA93 Desktop | Intel Core i7-12700F 12-Core | NVIDIA GeForce GTX 1660 Super | 16GB DDR4 | 512GB SSD | 1TB HDD | 8X DVD | Intel Wi-Fi 6 AX201 | Bluetooth 5.2 | Windows 11 Pro",
      price: "$1,199.99",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/71+UtJsrCtL._AC_UY218_.jpg",
      vendor: "Acer",
    },
    {
      title: "Apple iMac MF883LL/A 21.5-Inch 500GB Desktop (Renewed)",
      price: "$229.99",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/71mwhddX4mS._AC_UY218_.jpg",
      vendor: "Apple",
    },
    {
      title:
        'HP 27 All-in-One Desktop, 27" FHD Screen, AMD Ryzen 5 5625U Processor, 32GB DDR4 RAM, 512GB PCIe SSD + 1TB HDD, Pop-up Webcam, RJ45, HDMI, Wi-Fi 6, Wired KB & Mouse, Windows 11 Home, Black',
      price: "$1,059.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/71KAj+xnOtL._AC_UY218_.jpg",
      vendor: "HP",
    },
    {
      title:
        'Lenovo IdeaCentre AIO 3i 22" All-in-One Computer, Intel Core i3-1115G4, FHD Touch Display, 8GB RAM, 256GB SSD, DVD RW Drive, Windows 11',
      price: "$659.92",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/71ZOH88uZlL._AC_UY218_.jpg",
      vendor: "Lenovo",
    },
    {
      title:
        'Lenovo SFF Computer Desktop PC, Intel Core i7 3.4GHz Processor, 16GB Ram, 128GB SSD, 2TB HDD, Wireless Keyboard & Mouse, WiFi | Bluetooth, New 23.8" FHD LED Monitor, Win 10 Pro (Renewed)',
      price: "$284.53",
      "striked-price": "$318.48",
      image: "https://m.media-amazon.com/images/I/81bONzxcpWL._AC_UY218_.jpg",
      vendor: "Lenovo",
    },
    {
      title:
        "Dell Inspiron 3910 Desktop Computer Tower - 12th Gen Intel Core i5-12400, 16GB DDR4 RAM, 256GB SSD + 1TB HDD, Intel UHD Graphics 730, WiFi 6, HDMI, Bluetooth, USB-C, Windows 11 Home - Blue",
      price: "$614.00",
      "striked-price": "$749.99",
      image: "https://m.media-amazon.com/images/I/71ilwAO89yL._AC_UY218_.jpg",
      vendor: "Dell",
    },
    {
      title:
        'Lenovo IdeaCentre AIO 5i All-in-One Computer, 27" QHD Touch Display, Intel Core i7-10700T, 16GB RAM, 1TB HDD, 512GB SSD, Windows 11',
      price: "$1,149.99",
      "striked-price": "$1,299.99",
      image: "https://m.media-amazon.com/images/I/71Dc5Fh6kFL._AC_UY218_.jpg",
      vendor: "Lenovo",
    },
    {
      title:
        "2021 Apple iMac (24-inch, Apple M1 chip with 8core CPU and 8core GPU, 8GB RAM, 256GB) - Yellow",
      price: "$1,449.99",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/61OShYJOklL._AC_UY218_.jpg",
      vendor: "Apple",
    },
    {
      title:
        'Dell Optiplex 7010 Desktop PC, Intel Core i5-3470 3.2 GHz, 8GB RAM, 500GB HDD, Keyboard/Mouse, WiFi, Dual 17" LCD Monitors (Brands Vary), DVD, Windows 10 (Renewed)',
      price: "$149.00",
      "striked-price": "$169.99",
      image: "https://m.media-amazon.com/images/I/711YdZBmaXL._AC_UY218_.jpg",
      vendor: "Dell",
    },
    {
      title:
        "Dell Desktop Computer Package Compatible with Dell Optiplex 7010 Intel Quad Core i5 3.2GHz, 8GB Ram, 500GB HDD, 19-inch LCD, DVD, WiFi, Keyboard, Mouse, Windows 10 Pro (Renewed)",
      price: "$133.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/71IrtnjZD2L._AC_UY218_.jpg",
      vendor: "Dell",
    },
    {
      title:
        "2022 Apple MacBook Pro Laptop with M2 chip: 13-inch Retina Display, 8GB RAM, 512GB SSD Storage, Touch Bar, Backlit Keyboard, FaceTime HD Camera. Works with iPhone and iPad; Silver",
      price: "$1,349.99",
      "striked-price": "$1,499.00",
      image: "https://m.media-amazon.com/images/I/61bX2AoGj2L._AC_UY218_.jpg",
      vendor: "Apple",
    },
    {
      title:
        "Portable Monitor SVANTTO [2022 Latest] FHD 15.6'' Portable Screen for Laptop 400Nits Brightness Travel Monitor, 100% sRGB 1080P Laptop Monitor Extender, Mac Xbox PS5 Computer Display with HDMI Cable",
      price: "$118.99",
      "striked-price": "$149.99",
      image: "https://m.media-amazon.com/images/I/618O1Tz8gIL._AC_UY218_.jpg",
      vendor: "SVANTTO",
    },
    {
      title:
        "2020 Apple MacBook Air Laptop: Apple M1 Chip, 13 Retina Display, 8GB RAM, 256GB SSD Storage, Backlit Keyboard, FaceTime HD Camera, Touch ID. Works with iPhone/iPad; Silver",
      price: "$799.99",
      "striked-price": "$999.00",
      image: "https://m.media-amazon.com/images/I/71TPda7cwUL._AC_UL320_.jpg",
      vendor: "Apple",
    },
    {
      title:
        "2022 Apple MacBook Pro Laptop with M2 chip: 13-inch Retina Display, 8GB RAM, 512GB SSD Storage, Touch Bar, Backlit Keyboard, FaceTime HD Camera. Works with iPhone and iPad; Silver",
      price: "$1,349.99",
      "striked-price": "$1,499.00",
      image: "https://m.media-amazon.com/images/I/61bX2AoGj2L._AC_UL320_.jpg",
      vendor: "Apple",
    },
    {
      title:
        "Dell XPS 13 9310 Touchscreen Laptop 13.4-inch UHD+ Thin and Light, Intel Core i7-1195G7, 16GB LPDDR4x RAM, 512G SSD, Intel Iris Xe Graphics, Windows 11 Home, 1-Year Preminum Support - Platinum Silver",
      price: "$1,649.99",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/91MXLpouhoL._AC_UL320_.jpg",
      vendor: "Dell",
    },
    {
      title:
        'HP All-in-One Desktop, 21.5" FHD Display, Intel Celeron J4025 Processor, 16GB DDR4 RAM, 512GB PCIe SSD, Webcam, Wi-Fi, HDMI, RJ-45, Wired Keyboard&Mouse, Windows 11 Home, White',
      price: "$599.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/91-CdWQGWAL._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        "Dell Inspiron 3000 Business Laptop, 15.6''FHD Display, 11th Gen Intel Core i3-1115G4, Windows 11 Home, 16GB RAM, 1TB HDD, Carbon Black, HDMI, Wi-Fi, Intel UHD Graphics, Bluetooth, Long Battery Life",
      price: "$549.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/81mSmcpGW-L._AC_UL320_.jpg",
      vendor: "Dell",
    },
    {
      title:
        'HP Chromebook Laptop 14a-na1043cl 14" Diagonal FHD IPS Display 1920 x 1080 Intel Celeron N4500 4 GB Memory 64 GB eMMC Storage Chrome OS Mineral Silver (Renewed)',
      price: "$129.95",
      "striked-price": "$139.95",
      image: "https://m.media-amazon.com/images/I/51l3T67lolL._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        "Dell Inspiron 3910 Desktop, 12th Gen Intel Core i5-12400 Processor, 32GB DDR4 RAM, 1TB SSD, HDMI, DP, DVD-RW, Bluetooth, Wired Keyboard&Mouse, Wi-Fi 6, Windows 11 Home, Black",
      price: "$813.01",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/71quK39PJ-L._AC_UL320_.jpg",
      vendor: "Dell",
    },
    {
      title:
        "2020 Apple MacBook Air Laptop: Apple M1 Chip, 13 Retina Display, 8GB RAM, 256GB SSD Storage, Backlit Keyboard, FaceTime HD Camera, Touch ID. Works with iPhone/iPad; Silver",
      price: "$799.99",
      "striked-price": "$999.00",
      image: "https://m.media-amazon.com/images/I/71TPda7cwUL._AC_UL320_.jpg",
      vendor: "Apple",
    },
    {
      title:
        "2022 Flagship Lenovo Ideapad 17.3 Inch HD+ Laptop, Intel i5-1135G7, Quad Core Upto 4.2 GHz, Iris Xe Graphics, 8GB RAM, 256GB PCIe SSD, WiFi 6, Webcam, Fingerprint, Win 11, Arctic Gray +MarxsolCables",
      price: "$579.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/81S72D-TYuL._AC_UL320_.jpg",
      vendor: "Lenovo",
    },
    {
      title:
        '2022 Newest HP All-in-One Desktop, 21.5" FHD Display, Intel Celeron J4025 Processor, 16GB RAM, 1TB PCIe SSD, Webcam, WiFi, HDMI, RJ-45, Wired Keyboard&Mouse, Windows 11 Home, White',
      price: "$659.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/91f9y+HBacL._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        "HP 27 All-in-One Desktop, AMD Ryzen 5 5500U, 16 GB RAM, 512 GB SSD, Full HD IPS Touchscreen, Windows 11 Home, 4 USB Ports, Privacy Camera, Dual Mics, Wireless Keyboard and Mouse (27-cb0060, 2021)",
      price: "$1,034.99",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/81GNWNoBlPL._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        "Dell Optiplex 7010 Business Desktop Computer (Intel Quad Core i5-3470 3.2GHz, 16GB RAM, 2TB HDD, USB 3.0, DVDRW, Windows 10 Professional (Renewed)",
      price: "$142.10",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/61Zp2XEDwxL._AC_UL320_.jpg",
      vendor: "Dell",
    },
    {
      title:
        "Portable Monitor SVANTTO [2022 Latest] FHD 15.6'' Portable Screen for Laptop 400Nits Brightness Travel Monitor, 100% sRGB 1080P Laptop Monitor Extender, Mac Xbox PS5 Computer Display with HDMI Cable",
      price: "$118.99",
      "striked-price": "$149.99",
      image: "https://m.media-amazon.com/images/I/618O1Tz8gIL._AC_UL320_.jpg",
      vendor: "SVANTTO",
    },
    {
      title:
        '2022 Newest HP All-in-One Desktop, 21.5" FHD Display, Intel Celeron J4025 Processor, 8GB RAM, 256GB PCIe SSD, Webcam, WiFi, HDMI, RJ-45, Wired Keyboard&Mouse, Windows 11 Home, White',
      price: "$589.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/91f9y+HBacL._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        '2022 Newest HP All-in-One Desktop, 21.5" FHD Display, Intel Celeron J4025 Processor, 16GB RAM, 1TB PCIe SSD, Webcam, HDMI, RJ-45, Wired Keyboard&Mouse, WiFi, Windows 11 Home, White',
      price: "$659.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/91y6RqUyBiL._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        "Dell Optiplex 9020 SFF Computer Desktop PC, Intel Core i5 Processor, 16GB Ram, 2TB Hard Drive, WiFi, Bluetooth 4.0, DVD-RW, Dual 24 Inch LCD Monitors Windows 10 Pro (Renewed)",
      price: "$290.00",
      "striked-price": "$304.60",
      image: "https://m.media-amazon.com/images/I/51DRM2OxSxL._AC_UL320_.jpg",
      vendor: "Dell",
    },
    {
      title:
        "HP 600 G1 SFF Computer Desktop PC, Intel Core i7 3.4GHz Processor, 16GB Ram, 128GB M.2 SSD, 2TB HDD, Wireless Keyboard Mouse, WiFi | Bluetooth, New HP Dual 27 FHD LED Monitor, Windows 10 (Renewed)",
      price: "$619.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/71LOjWjeuLL._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        "Newest Dell Inspiron 24 5000 All-in-One Business Desktop, 23.8 FHD Touchscreen, Intel i5-1135G7, 16GB DDR4 RAM, 512GB SSD, Webcam, Wi-Fi 6, HDMI, Wireless Keyboard&Mouse, Win11 Home, Silver",
      price: "$769.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/81HM+xYvnvL._AC_UL320_.jpg",
      vendor: "Dell",
    },
    {
      title:
        'HP 21.5" All-in-One Desktop, Intel Pentium Silver J5040 Processor, Intel UHD Graphics 605, 4 GB RAM, 128 GB Storage, Windows 11 Home (22-dd0120, 2021)',
      price: "$379.99",
      "striked-price": "$409.99",
      image: "https://m.media-amazon.com/images/I/81irrGY4jTL._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title: "Apple MacBook Air MJVM2LL/A 11.6-Inch 128GB Laptop (Renewed)",
      price: "$284.62",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/61LLziMeLlL._AC_UL320_.jpg",
      vendor: "Apple",
    },
    {
      title:
        "2021 Apple MacBook Pro (16-inch, Apple M1 Max chip with 10core CPU and 32core GPU, 32GB RAM, 1TB SSD) - Space Gray",
      price: "$3,099.00",
      "striked-price": "$3,499.00",
      image: "https://m.media-amazon.com/images/I/61aUBxqc5PL._AC_UL320_.jpg",
      vendor: "Apple",
    },
    {
      title:
        "HP Elite Desktop Computer PC, 3.1 GHz, Intel Core i5, 16GB, RAM, 1TB HDD, MTG New 22 inch LED Monitor, RGB Speaker and Keyboard Mouse, WiFi, Windows 10 Pro (Renewed)",
      price: "$239.90",
      "striked-price": "$277.79",
      image: "https://m.media-amazon.com/images/I/71sNznE8HZL._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        "Lenovo All in one Tiny Computer Desktop PC, Intel Pentium J3710 Processor, 8GB Ram, 256GB SSD, New FHD 22 Inch Monitor, Wireless Keyboard and Mouse, WiFi/Bluetooth, Windows 10 (Renewed)",
      price: "$249.99",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/81m4iFZ8uKL._AC_UL320_.jpg",
      vendor: "Lenovo",
    },
    {
      title:
        '2022 Newest Dell Inspiron 7700 All-in-One Desktop, 27" FHD Touchscreen, 11th Gen Intel i7-1165G7, GeForce MX330, 32GB RAM, 1TB SSD, IR Camera, WiFi 6, Wireless KB&Mouse, Win 11 Home',
      price: "$1,415.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/71Yqyi6Rx+L._AC_UL320_.jpg",
      vendor: "Dell",
    },
    {
      title:
        "HP Chromebook 11-inch Laptop - Up to 15 Hour Battery Life - MediaTek - MT8183 - 4 GB RAM - 32 GB eMMC Storage - 11.6-inch HD Display - with Chrome OS - (11a-na0021nr, 2020 model, Snow White)",
      price: "$169.99",
      "striked-price": "$259.99",
      image: "https://m.media-amazon.com/images/I/716Daz3br+L._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        "HP All-in-One Bundle PC, AMD Ryzen Processor, Radeon Graphics, 8 GB RAM, 512 GB SSD, FHD IPS Touchscreen Display, Windows 11 Home OS, Dual Computer Speakers, Wi-Fi & Bluetooth (24-cb1140, 2022)",
      price: "$819.99",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/716tno-zi5L._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        "Dell Optiplex 9010 Desktop Computer, Intel Core i5 3.2 GHz, 16 GB RAM, 1 TB SATA HDD, Keyboard & Mouse, Wi-Fi, HDMI, DVD-ROM, Windows 10 Professional, (Renewed)",
      price: "$118.99",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/61dz1o-zDyL._AC_UL320_.jpg",
      vendor: "Dell",
    },
    {
      title:
        "Dell OptiPlex 9020 i7 SFF Desktop Computer,Intel Quad Core i7-4790 up to 4.0GHz, 32GB Ram New 1TB SSD, AX200 Built-in WiFi 6, DVD-RW Dual Monitor Supported, Windows 10 Pro (Renewed)",
      price: "$276.39",
      "striked-price": "$300.98",
      image: "https://m.media-amazon.com/images/I/61Tw-0Che-L._AC_UL320_.jpg",
      vendor: "Dell",
    },
    {
      title:
        "Dell Optiplex 9020 Mini Tower Desktop PC, Intel Core i7-4770-3.4 GHz, 32GB Ram, 1TB (1000GB) SSD Drive, WiFi, DVD-RW, Windows 10 Pro (Renewed)",
      price: "$256.29",
      "striked-price": "$331.98",
      image: "https://m.media-amazon.com/images/I/61VbcdeTHcL._AC_UL320_.jpg",
      vendor: "Dell",
    },
    {
      title:
        "Dell Optiplex 5050 Small Form Factor (SFF) Business Desktop PC, Intel i7-7700 Quad-Core 3.6 GHz, 16GB DDR4, 512G NVME SSD Windows 10 Pro (Renewed)",
      price: "$287.50",
      "striked-price": "$369.49",
      image: "https://m.media-amazon.com/images/I/61jxXOoTelL._AC_UL320_.jpg",
      vendor: "Dell",
    },
    {
      title:
        'Lenovo Chromebook Flex 3 11" Laptop, 11.6-Inch HD IPS Display, MediaTek MT8173C, 4GB RAM, 64GB Storage, Chrome OS, Blizzard White',
      price: "$172.00",
      "striked-price": "$319.99",
      image: "https://m.media-amazon.com/images/I/611DJR7V1sL._AC_UL320_.jpg",
      vendor: "Lenovo",
    },
    {
      title:
        'Acer Chromebook Spin 311 Convertible Laptop, Intel Celeron N4020, 11.6" HD Touch, 4GB LPDDR4, 32GB eMMC, Gigabit Wi-Fi 5, Bluetooth 5.0, Google Chrome, CP311-2H-C679',
      price: "$171.00",
      "striked-price": "$289.99",
      image: "https://m.media-amazon.com/images/I/71c5W9NxN5L._AC_UL320_.jpg",
      vendor: "Acer",
    },
    {
      title:
        "HP z230 Workstation SFF Desktop Computer, Intel Core i7-4770 Upto 3.9GHz, 32GB RAM, 1TB SSD + 500GB HDD, HD Graphics 4600 4K, DisplayPort, HDMI, Wi-Fi, Bluetooth - Windows 10 Pro (Renewed)",
      price: "$236.74",
      "striked-price": "$252.98",
      image: "https://m.media-amazon.com/images/I/71feVTNTaGL._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        "2020 Apple MacBook Air Laptop: Apple M1 Chip, 13 Retina Display, 8GB RAM, 256GB SSD Storage, Backlit Keyboard, FaceTime HD Camera, Touch ID. Works with iPhone/iPad; Silver",
      price: "$799.99",
      "striked-price": "$999.00",
      image: "https://m.media-amazon.com/images/I/71TPda7cwUL._AC_UL320_.jpg",
      vendor: "Apple",
    },
    {
      title:
        "2022 Apple MacBook Pro Laptop with M2 chip: 13-inch Retina Display, 8GB RAM, 512GB SSD Storage, Touch Bar, Backlit Keyboard, FaceTime HD Camera. Works with iPhone and iPad; Silver",
      price: "$1,349.99",
      "striked-price": "$1,499.00",
      image: "https://m.media-amazon.com/images/I/61bX2AoGj2L._AC_UL320_.jpg",
      vendor: "Apple",
    },
    {
      title:
        'HP All-in-One Desktop, 21.5" FHD Display, Intel Celeron J4025 Processor, 16GB DDR4 RAM, 512GB PCIe SSD, Webcam, Wi-Fi, HDMI, RJ-45, Wired Keyboard&Mouse, Windows 11 Home, White',
      price: "$599.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/91-CdWQGWAL._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        "Dell XPS 13 9310 Touchscreen Laptop 13.4-inch UHD+ Thin and Light, Intel Core i7-1195G7, 16GB LPDDR4x RAM, 512G SSD, Intel Iris Xe Graphics, Windows 11 Home, 1-Year Preminum Support - Platinum Silver",
      price: "$1,649.99",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/91MXLpouhoL._AC_UL320_.jpg",
      vendor: "Dell",
    },
    {
      title:
        "Dell Optiplex Tower Computer Gaming PC [ Intel Core i7 Processor, 16GB Ram, 128GB SSD, 2TB Hard Drive, HDMI, Wireless WiFi] AMD Radeon RX 550 4GB, Windows 10 (Renewed)",
      price: "$289.99",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/716+YZy3q6L._AC_UL320_.jpg",
      vendor: "Dell",
    },
    {
      title:
        "HP ENVY Desktop Computer, Intel Core i7-10700, 16 GB RAM, 1 TB Hard Drive & 512 GB SSD Storage, Windows 10 Pro (TE01-1254, 2020 Model)",
      price: "$955.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/71eG5pWqiPS._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        'HP Envy 34 Desktop 512GB SSD 64GB RAM Win 11 PRO (Intel 11th gen Processor with Six cores and Turbo to 4.40GHz, 64 GB RAM, 512 GB SSD, 34" 5K WUHD (5120 x 2160), Win 11 Pro) PC Computer All-in-One',
      price: "$2,499.99",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/61bIAxXAATL._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        "Acer Aspire TC-1660-UA92 Desktop | 10th Gen Intel Core i5-10400 6-Core Processor | 12GB 2666MHz DDR4 | 512GB NVMe M.2 SSD | 8X DVD | Intel Wireless Wi-Fi 6 | Bluetooth 5.2 | Windows 10 Home",
      price: "$632.00",
      "striked-price": "$676.00",
      image: "https://m.media-amazon.com/images/I/616BXacLrRS._AC_UL320_.jpg",
      vendor: "Acer",
    },
    {
      title:
        "2018 Dell OptiPlex Desktop Complete Computer Package with DVD, WiFi, Windows 10 - Keyboard, Mouse, 19in LCD Monitor(Brands May Vary) (Renewed) - Multi-Language Support English/Spanish",
      price: "$124.34",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/61-nM+1Q0DL._AC_UL320_.jpg",
      vendor: "Dell",
    },
    {
      title:
        "Dell Inspiron 3880 Desktop Computer - Intel Core i5 10th Gen, 12GB Memory, 512GB Solid State Drive, Windows 10 Pro, 2 Year On-Site - Black",
      price: "$672.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/71s1fwAw55L._AC_UL320_.jpg",
      vendor: "Dell",
    },
    {
      title:
        '2022 Newest HP All-in-One Desktop, 21.5" FHD Display, Intel Celeron J4025 Processor, 8GB RAM, 256GB PCIe SSD, Webcam, WiFi, HDMI, RJ-45, Wired Keyboard&Mouse, Windows 11 Home, White',
      price: "$589.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/91f9y+HBacL._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        '2022 Newest HP All-in-One Desktop, 21.5" FHD Display, Intel Celeron J4025 Processor, 16GB RAM, 1TB PCIe SSD, Webcam, HDMI, RJ-45, Wired Keyboard&Mouse, WiFi, Windows 11 Home, White',
      price: "$659.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/91y6RqUyBiL._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        "HP 2020 Flagship 14 Chromebook Laptop Computer 14-inch HD SVA Anti-Glare Display Intel Celeron N5000 Processor 4GB DDR4 64GB eMMC WiFi Webcam Chrome OS (Renewed)",
      price: "$129.99",
      "striked-price": "$247.89",
      image: "https://m.media-amazon.com/images/I/817Y3zdhTXL._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        "Dell Inspiron 3910 Desktop Computer Tower - 12th Gen Core i5-12400, 16GB DDR4 RAM, 256GB SSD + 1TB HDD, Intel UHD Graphics 730, WiFi 6, HDMI, Bluetooth, USB-C, Windows 11 Home - Blue (Renewed)",
      price: "$575.99",
      "striked-price": "$614.00",
      image: "https://m.media-amazon.com/images/I/71ilwAO89yL._AC_UL320_.jpg",
      vendor: "Dell",
    },
    {
      title:
        "HP Pavilion 27-inch All-in-One Desktop, 10th Gen Intel i7-10700T Processor, 16 GB RAM, 1 TB SSD Storage, Full HD IPS Touchscreen, Windows 10 Home, Wireless Keyboard and Mouse Combo (27-d0080, 2020)",
      price: "$1,814.99",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/81rj9ek8QyL._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        "Apple MacBook Air with Intel Core i5, 1.6GHz, (13-inch, 4GB,128GB SSD) - Silver (Renewed)",
      price: "$274.99",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/6157eU56s2L._AC_UL320_.jpg",
      vendor: "Apple",
    },
    {
      title:
        'Newest Lenovo IdeaPad 3 17.3" HD+ Laptop, Intel 4-Core i7-1165G7, 36GB RAM DDR4 1TB M.2 NVMe SSD, Iris Xe Graphics, WIFI6, Type-C, HDMI, Webcam, Windows 11 Pro (82H900EFUS, Platinum Grey)',
      price: "$1,199.99",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/71YIgww0oFL._AC_UL320_.jpg",
      vendor: "Lenovo",
    },
    {
      title:
        '2022 HP 14" HD Laptop, Windows 11, Intel Celeron Dual-Core Processor Up to 2.80GHz, 4GB RAM, 64GB SSD, Chromes OS, Cobalt Blue (Renewed)',
      price: "$189.80",
      "striked-price": "$199.99",
      image: "https://m.media-amazon.com/images/I/61Y6qYNGslL._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        "HP Pavilion Gaming Desktop, NVIDIA GeForce GTX 1650 Super, Intel Core i5-10400F, 16 GB DDR4 RAM, 1TB SSD, USB Mouse and Keyboard, Compact Tower Design, Windows 11 Home",
      price: "$829.99",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/81-ygafviaL._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        "Portable Monitor SVANTTO [2022 Latest] FHD 15.6'' Portable Screen for Laptop 400Nits Brightness Travel Monitor, 100% sRGB 1080P Laptop Monitor Extender, Mac Xbox PS5 Computer Display with HDMI Cable",
      price: "$118.99",
      "striked-price": "$149.99",
      image: "https://m.media-amazon.com/images/I/618O1Tz8gIL._AC_UL320_.jpg",
      vendor: "SVANTTO",
    },
    {
      title:
        "Dell OptiPlex 7020 Desktop Computer, 32GB Ram New 2TB SSD, Intel Quad Core i7 4790 up to 4.0GHz, AC8260 Built-in WiFi 5, Dual Monitor Supported, DVD-RW HDMI Windows 10 Pro (Renewed)",
      price: "$419.98",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/61w02pgRLGL._AC_UL320_.jpg",
      vendor: "Dell",
    },
    {
      title:
        "Dell Optiplex 7010 Desktop Computer - Intel Core i7 Up to 3.8GHz Max Turbo Frequency, 16GB DDR3, New 1TB SSD, Windows 10 Pro 64-Bit, WiFi, USB 3.0, DVDRW, 2X Display Port (Renewed)",
      price: "$194.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/61Mu88RY72S._AC_UL320_.jpg",
      vendor: "Dell",
    },
    {
      title:
        "2021 Newest HP 14 inch HD Laptop Computer, Intel Celeron N4000 up to 2.6 GHz, 4GB DDR4, 64GB eMMC Storage, WiFi , Webcam, HDMI, Bluetooth, 1 Year Microsoft 365,Windows 10 S, Rose Pink + Hubxcel Cables",
      price: "$299.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/71AmnxQ7b2L._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        "Acer Veriton Desktop Computer - Intel i5-9400 Upto 4.10GHz, 8GB Ram, 256GB NVMe SSD, AC Wi-Fi, Bluetooth, VGA, DisplayPort, HDMI, DVD-RW, SD-Card Reader - Windows 11 Pro, Black / Grey",
      price: "$529.99",
      "striked-price": "$559.99",
      image: "https://m.media-amazon.com/images/I/71znxpeJqjL._AC_UL320_.jpg",
      vendor: "Acer",
    },
    {
      title:
        "2022 Dell OptiPlex 3090 SFF Professional Business Desktop(Intel Hexa Core (6-Cores) i5-10500, 32GB RAM DDR4, 1TB PCIe SSD, Integrated Graphics, 200W Power Supply, AC WiFi, BT 5.0, USB 3.2, Win10P)",
      price: "$959.99",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/61I5jZpnYlL._AC_UL320_.jpg",
      vendor: "Dell",
    },
    {
      title:
        'HP Envy 34" IPS Anti-Glare WUHD (5120x2160) All-in-One Desktop Computer - 11th Gen Intel Core i7-11700 up to 4.9 GHz CPU, 128GB RAM, 8TB (2 x 4TB) NVMe SSD, GeForce GTX 1650 4GB, Windows 11 Pro',
      price: "$4,359.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/61aGprGDWiL._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        "HP Envy Business Desktop, 11th Gen Intel Core i7-11700F, Windows 11 Pro, 32GB RAM, 1TB SSD, WiFi 6, RJ-45, HDMI, Bluetooth, GeForce GTX 1660 Super, Durlyfish",
      price: "$1,299.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/61kMJjRbwSL._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        '[Windows 11 Pro] 2022 Newest HP 17 Business Laptop, Intel Quad-Core i7-1165G7, 17.3" HD+ Touchscreen, 64GB DDR4 RAM, 2TB PCIe SSD, WiFi 6, Bluetooth 5.0, Type-C, Backlit KB, broag 64GB Flash Stylus',
      price: "$1,409.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/81xMhCovfzL._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        'Lenovo Touchscreen 15.6" IdeaPad Laptop with Fingerprint Reader (Latest Model), Full HD Display, Intel Core i3-1115G4, 20GB RAM, 1TB SSD, USB Type-C, NLY MP, Windows 11',
      price: "$599.99",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/71L03j8tyJL._AC_UL320_.jpg",
      vendor: "Lenovo",
    },
    {
      title:
        "HP 14 Laptop, Intel Celeron N4020, 4 GB RAM, 64 GB Storage, 14-inch HD Touchscreen, Windows 10 Home, Thin & Portable, 4K Graphics, One Year of Microsoft 365 (14-dq0080nr, 2021, Snowflake White)",
      price: "$269.99",
      "striked-price": "$299.99",
      image: "https://m.media-amazon.com/images/I/81fNYcOJYbS._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        "HP Elite Desktop Computer Tower PC Intel Ci5-2400, 16GB Ram, 2TB HDD, Wireless WiFi, Bluetooth Adapter, DVD-ROM, Keyboard Mouse 24 inches Dual LCD Monitor Brands Vary, Windows 10 (Renewed)",
      price: "$299.99",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/61vDca+GIVL._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        "HP Envy Desktop, 12th Gen Intel Core i7-12700, Intel UHD Graphics 770,64GB DDR4 RAM, 2TB SSD + 4TB HDD,Wi-Fi 6, Windows 11 Pro,Wireless Keyboard and Mouse Combo",
      price: "$1,499.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/51SznMqK6oL._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        '2021 Dell Inspiron 15 3000 15.6" HD Laptop Computer, Intel Celeron Processor 4205U, 4GB RAM, 128GB PCIe SSD, Intel UHD Graphics 610, Waves MaxxAudio, HD Webcam, Windows 10, Black',
      price: "$319.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/51RudADrNTL._AC_UL320_.jpg",
      vendor: "Dell",
    },
    {
      title:
        "Newest Dell Inspiron 24 5000 All-in-One Business Desktop, 23.8 FHD Touchscreen, Intel i5-1135G7, 32GB DDR4 RAM, 1TB SSD, Webcam, Wi-Fi 6, HDMI, Wireless Keyboard&Mouse, Win11 Home, Silver",
      price: "$869.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/81HM+xYvnvL._AC_UL320_.jpg",
      vendor: "Dell",
    },
    {
      title:
        "Dell Optiplex 7010 SFF Desktop PC - Intel Core i5-3470 3.2GHz 4GB 250GB DVD Windows 10 Pro (Renewed)",
      price: "$92.00",
      "striked-price": "$101.00",
      image: "https://m.media-amazon.com/images/I/81Bymeg4wKL._AC_UL320_.jpg",
      vendor: "Dell",
    },
    {
      title:
        '2022 Newest Dell Inspiron 7700 All-in-One Desktop, 27" FHD Touch Display, 11th Gen Intel i7-1165G7, GeForce MX330, 64GB RAM, 2TB SSD, IR Camera, WiFi 6, Wireless KB&Mouse, Win 11 Home',
      price: "$1,726.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/91dVTQwOj9L._AC_UL320_.jpg",
      vendor: "Dell",
    },
    {
      title:
        "Dell OptiPlex 5250 All in One PC FHD 1920 x 1080 Desktop Computer, Intel Core i5-6500 Processor | 8GB Ram, 500GB HDD | DVD, Webcam, HDMI, Windows 10 (Renewed)",
      price: null,
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/61S8PKUYzgL._AC_UL320_.jpg",
      vendor: "Dell",
    },
    {
      title:
        "Dell Optiplex 5050 Small Form Factor (SFF) Business Desktop PC, Intel i7-7700 Quad-Core 3.6 GHz, 16GB DDR4, 512G NVME SSD Windows 10 Pro (Renewed)",
      price: "$287.50",
      "striked-price": "$369.49",
      image: "https://m.media-amazon.com/images/I/61jxXOoTelL._AC_UL320_.jpg",
      vendor: "Dell",
    },
    {
      title:
        "2020 Apple MacBook Air Laptop: Apple M1 Chip, 13 Retina Display, 8GB RAM, 256GB SSD Storage, Backlit Keyboard, FaceTime HD Camera, Touch ID. Works with iPhone/iPad; Silver",
      price: "$799.99",
      "striked-price": "$999.00",
      image: "https://m.media-amazon.com/images/I/71TPda7cwUL._AC_UL320_.jpg",
      vendor: "Apple",
    },
    {
      title:
        "2022 Apple MacBook Pro Laptop with M2 chip: 13-inch Retina Display, 8GB RAM, 512GB SSD Storage, Touch Bar, Backlit Keyboard, FaceTime HD Camera. Works with iPhone and iPad; Silver",
      price: "$1,349.99",
      "striked-price": "$1,499.00",
      image: "https://m.media-amazon.com/images/I/61bX2AoGj2L._AC_UL320_.jpg",
      vendor: "Apple",
    },
    {
      title:
        'HP All-in-One Desktop, 21.5" FHD Display, Intel Celeron J4025 Processor, 16GB DDR4 RAM, 512GB PCIe SSD, Webcam, Wi-Fi, HDMI, RJ-45, Wired Keyboard&Mouse, Windows 11 Home, White',
      price: "$599.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/91-CdWQGWAL._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        "Lenovo ThinkCentre M910Q Tiny Desktop Computer, Intel Core i7-6700T Upto 3.6GHz, 32GB RAM, 1TB NVMe SSD, 4K 3-Monitor Support DisplayPort, HDMI, AC Wi-Fi, Bluetooth - Windows 10 Pro (Renewed)",
      price: "$302.98",
      "striked-price": "$319.00",
      image: "https://m.media-amazon.com/images/I/31s2SxtLghL._AC_UL320_.jpg",
      vendor: "Lenovo",
    },
    {
      title:
        "Dell Optiplex 7010 Business Desktop Computer (Intel Quad Core i5-3470 3.2GHz, 16GB RAM, 2TB HDD, USB 3.0, DVDRW, Windows 10 Professional (Renewed)",
      price: "$142.10",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/61Zp2XEDwxL._AC_UL320_.jpg",
      vendor: "Dell",
    },
    {
      title:
        'HP - 14" Laptop - AMD Ryzen 3 - 8GB Memory - 128GB SSD - Natural Silver - Model 14-fq0033dx',
      price: "$279.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/81gNI07678L._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        'Dell Latitude 7490 Intel Core i7-8650U 16GB DDR4 RAM, 512GB SSD 14" FHD Windows 10 Pro Laptop (Renewed)',
      price: "$352.00",
      "striked-price": "$1,370.77",
      image: "https://m.media-amazon.com/images/I/71zkzCckCYL._AC_UL320_.jpg",
      vendor: "Dell",
    },
    {
      title:
        "Dell Optiplex 9020 SFF Computer Desktop PC, Intel Core i5 Processor, 16GB Ram, 2TB Hard Drive, WiFi, Bluetooth 4.0, DVD-RW, Dual 24 Inch LCD Monitors Windows 10 Pro (Renewed)",
      price: "$290.00",
      "striked-price": "$304.60",
      image: "https://m.media-amazon.com/images/I/51DRM2OxSxL._AC_UL320_.jpg",
      vendor: "Dell",
    },
    {
      title:
        "Dell Latitude E6420 14.1-Inch Laptop (Intel Core i5 2.5GHz with 3.2G Turbo Frequency, 4G RAM, 128G SSD, Windows 10 Professional 64-bit) (Renewed)",
      price: "$162.94",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/61Zj+RENXHS._AC_UL320_.jpg",
      vendor: "Dell",
    },
    {
      title:
        "Newest Dell 3189 Convertible Chromebook 11.6 inches HD IPS Touchscreen, Intel Celeron N3060 Up to 2.48GHz, 4GB Ram 32GB SSD, HDMI, WiFi, Webcam, Chrome OS- (Renewed)",
      price: "$79.49",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/71Yl-gOe5NL._AC_UL320_.jpg",
      vendor: "Dell",
    },
    {
      title:
        "Portable Monitor SVANTTO [2022 Latest] FHD 15.6'' Portable Screen for Laptop 400Nits Brightness Travel Monitor, 100% sRGB 1080P Laptop Monitor Extender, Mac Xbox PS5 Computer Display with HDMI Cable",
      price: "$118.99",
      "striked-price": "$149.99",
      image: "https://m.media-amazon.com/images/I/618O1Tz8gIL._AC_UL320_.jpg",
      vendor: "SVANTTO",
    },
    {
      title:
        "Dell XPS 13 9310 Touchscreen Laptop 13.4-inch UHD+ Thin and Light, Intel Core i7-1195G7, 16GB LPDDR4x RAM, 512G SSD, Intel Iris Xe Graphics, Windows 11 Home, 1-Year Preminum Support - Platinum Silver",
      price: "$1,649.99",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/91MXLpouhoL._AC_UL320_.jpg",
      vendor: "Dell",
    },
    {
      title:
        '2022 Newest HP All-in-One Desktop, 21.5" FHD Display, Intel Celeron J4025 Processor, 8GB RAM, 256GB PCIe SSD, Webcam, WiFi, HDMI, RJ-45, Wired Keyboard&Mouse, Windows 11 Home, White',
      price: "$589.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/91f9y+HBacL._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        '2022 Lenovo Chromebook Flex 3, 2-in-1 11.6" HD Touchscreen for Business and Student Laptop, MediaTek MT8173C CPU, 4GB LPDDR3, 32GB eMMC, PowerVR Graphics, Webcam, Chrome OS, Grey, 128GB USB Card',
      price: "$159.00",
      "striked-price": "$167.00",
      image: "https://m.media-amazon.com/images/I/510z83I8JgL._AC_UL320_.jpg",
      vendor: "Lenovo",
    },
    {
      title:
        "HP 14 Laptop, Intel Celeron N4020, 4 GB RAM, 64 GB Storage, 14-inch Micro-edge HD Display, Windows 10 Home, Thin & Portable, 4K Graphics, One Year of Microsoft 365 (14-dq0010nr, 2021, Indigo Blue)",
      price: "$219.98",
      "striked-price": "$249.99",
      image: "https://m.media-amazon.com/images/I/81VZCXrXwrS._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        "HP 600 G1 SFF Computer Desktop PC, Intel Core i7 3.4GHz Processor, 16GB Ram, 128GB M.2 SSD, 2TB HDD, Wireless Keyboard Mouse, WiFi | Bluetooth, New HP Dual 27 FHD LED Monitor, Windows 10 (Renewed)",
      price: "$619.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/71LOjWjeuLL._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        "2022 Newest HP Premium 14-inch HD Laptop| Intel Celeron N4020 to 2.8GHz 8GB RAM 128GB(64GB SSD+ 64GB Card)| Webcam Bluetooth HDMI USB-C Wi-Fi| Win 11 S with 1 Year MS 365| LIONEYE Bundle| Black",
      price: "$339.99",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/61sUu5crrML._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        "2021 Apple MacBook Pro (16-inch, Apple M1 Max chip with 10core CPU and 32core GPU, 32GB RAM, 1TB SSD) - Space Gray",
      price: "$3,099.00",
      "striked-price": "$3,499.00",
      image: "https://m.media-amazon.com/images/I/61aUBxqc5PL._AC_UL320_.jpg",
      vendor: "Apple",
    },
    {
      title:
        '2022 Newest HP All-in-One Desktop, 21.5" FHD Display, Intel Celeron J4025 Processor, 16GB RAM, 1TB PCIe SSD, Webcam, HDMI, RJ-45, Wired Keyboard&Mouse, WiFi, Windows 11 Home, White',
      price: "$659.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/91y6RqUyBiL._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        "HP Pavilion Gaming Desktop, NVIDIA GeForce GTX 1650 SUPER, Intel Core i3-10100, 8 GB DDR4 RAM, 256 GB PCIe NVMe SSD, Windows 11, USB Mouse and Keyboard, Compact Tower Design (TG01-1022, 2020)",
      price: "$613.95",
      "striked-price": "$739.99",
      image: "https://m.media-amazon.com/images/I/81liWNg7JzL._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        '2020 HP 14" HD (1366 x 768) Thin and Light Laptop PC, Intel Celeron N4020 Dual-Core Processor, 4GB DDR4 Memory, 64GB eMMC, HDMI, WiFi, Bluetooth, Windows 10 S, 1 Year Microsoft 365, Snowflake White',
      price: "$219.99",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/71IyteItZhL._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        "Newest Dell Inspiron 24 5000 All-in-One Business Desktop, 23.8 FHD Touchscreen, Intel i5-1135G7, 16GB DDR4 RAM, 512GB SSD, Webcam, Wi-Fi 6, HDMI, Wireless Keyboard&Mouse, Win11 Home, Silver",
      price: "$769.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/81HM+xYvnvL._AC_UL320_.jpg",
      vendor: "Dell",
    },
    {
      title:
        'HP 21.5" All-in-One Desktop, Intel Pentium Silver J5040 Processor, Intel UHD Graphics 605, 4 GB RAM, 128 GB Storage, Windows 11 Home (22-dd0120, 2021)',
      price: "$379.99",
      "striked-price": "$409.99",
      image: "https://m.media-amazon.com/images/I/81irrGY4jTL._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        "HP Pavilion Desktop PC, 12th Gen Intel Core i3-12100, 8 GB RAM, 512 GB SSD, Windows 11 Home, Wi-Fi 6 & Bluetooth 5.2, 9 USB Ports, Wired Keyboard & Mouse Combo, Pre-Built PC Tower (TP01-3030, 2022)",
      price: "$419.99",
      "striked-price": "$589.99",
      image: "https://m.media-amazon.com/images/I/51KeJfVnK8L._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        'HP 15.6" Touchscreen Laptop with Backlit Keyboard, 15.6-inch HD Touchscreen Display, AMD Dual-core Processor, AMD Radeon Graphics, Thin & Portable, Windows 10 Home(16GB RAM | 1TB SSD)',
      price: "$579.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/71i6ylbh+9L._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        "HP Elite Desktop Computer PC, 3.1 GHz, Intel Core i5, 16GB, RAM, 1TB HDD, MTG New 22 inch LED Monitor, RGB Speaker and Keyboard Mouse, WiFi, Windows 10 Pro (Renewed)",
      price: "$239.90",
      "striked-price": "$277.79",
      image: "https://m.media-amazon.com/images/I/71sNznE8HZL._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        "Apple MacBook Air MD761LL/A 13.3-Inch Laptop (OLD VERSION) (Renewed)",
      price: "$267.42",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/51NAVrA16EL._AC_UL320_.jpg",
      vendor: "Apple",
    },
    {
      title:
        "Acer R11 Convertible 2-in-1 Chromebook 11.6in IPS HD Touchscreen Intel N3150 Quad-core Up to 2.0GHz 4GB RAM 16GB SSD, Webcam, Bluetooth, Chrome OS Black (Renewed)",
      price: "$93.00",
      "striked-price": "$102.00",
      image: "https://m.media-amazon.com/images/I/41LM2B3kB6L._AC_UL320_.jpg",
      vendor: "Acer",
    },
    {
      title:
        "2021 Apple MacBook Pro (16-inch, Apple M1 Pro chip with 10core CPU and 16core GPU, 16GB RAM, 1TB SSD) - Space Gray",
      price: "$2,299.00",
      "striked-price": "$2,699.00",
      image: "https://m.media-amazon.com/images/I/61aUBxqc5PL._AC_UL320_.jpg",
      vendor: "Apple",
    },
    {
      title:
        '2022 Newest Dell Inspiron 7700 All-in-One Desktop, 27" FHD Touchscreen, 11th Gen Intel i7-1165G7, GeForce MX330, 32GB RAM, 1TB SSD, IR Camera, WiFi 6, Wireless KB&Mouse, Win 11 Home',
      price: "$1,415.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/71Yqyi6Rx+L._AC_UL320_.jpg",
      vendor: "Dell",
    },
    {
      title:
        "HP Chromebook 11-inch Laptop - Up to 15 Hour Battery Life - MediaTek - MT8183 - 4 GB RAM - 32 GB eMMC Storage - 11.6-inch HD Display - with Chrome OS - (11a-na0021nr, 2020 model, Snow White)",
      price: "$169.99",
      "striked-price": "$259.99",
      image: "https://m.media-amazon.com/images/I/716Daz3br+L._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title: "Apple iMac (27-inch, 8GB, 1TB Storage) Silver (Renewed)",
      price: "$369.99",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/71J3uJ-ZGJL._AC_UL320_.jpg",
      vendor: "Apple",
    },
    {
      title:
        "HP Chromebook 14b Laptop, AMD Athlon Silver 3050C Mobile Processor, 4 GB RAM, 64 GB eMMC Storage, 14-inch Full HD IPS Touchscreen, Google Chrome OS, Audio by B&O, Privacy Camera (14b-na0010nr, 2021)",
      price: "$319.99",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/81C023QkU7L._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        "Dell OptiPlex 7050 Micro Computer, Intel Quad Core i5-6500T up to 3.1GHz, 16G DDR4, 256G SSD, Windows 10 Pro 64 Bit-Multi-Language Supports English/Spanish/French(Renewed)",
      price: "$148.99",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/51muPv+cJzL._AC_UL320_.jpg",
      vendor: "Dell",
    },
    {
      title:
        'HP 27 All-in-One Desktop, 27" FHD Screen, AMD Ryzen 5 5625U Processor, 32GB DDR4 RAM, 2TB PCIe SSD, Pop-up Webcam, RJ45, HDMI, Wi-Fi 6, Wired KB & Mouse, Windows 11 Home, Black',
      price: "$1,169.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/71KAj+xnOtL._AC_UY218_.jpg",
      vendor: "HP",
    },
    {
      title:
        'Lenovo IdeaCentre 5i All-in-One Business Desktop, 23.8" FHD IPS Touchscreen, Intel Core i5-10400T, 64GB RAM, 1TB SSD, Webcam, HDMI, Wireless Keyboard&Mouse, Wireless Charger, Wi-Fi, Windows 11 Pro',
      price: "$1,209.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/81KDR9SR3WL._AC_UY218_.jpg",
      vendor: "Lenovo",
    },
    {
      title:
        "Dell Optiplex 990 Desktop Computer Package - Intel Quad Core i5 3.1-GHz, 16GB RAM, 2 TB, DVD-RW Drive, 20 Inch LCD Monitor, Keyboard, Mouse, WiFi, Bluetooth, Windows 10 (Renewed)",
      price: "$147.99",
      "striked-price": "$163.99",
      image: "https://m.media-amazon.com/images/I/71oMEU9bXSL._AC_UY218_.jpg",
      vendor: "Dell",
    },
    {
      title:
        'Acer 11.6" Intel Core Celeron 1.60 GHz 4 GB Ram 32 GB Flash Chrome OS|C771-C4TM (Renewed)',
      price: "$64.99",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/71ZjJNIjpKL._AC_UY218_.jpg",
      vendor: "Acer",
    },
    {
      title:
        "Dell Optiplex Tower Computer Gaming PC [ Intel Core i7 Processor, 16GB Ram, 128GB SSD, 2TB Hard Drive, HDMI, Wireless WiFi] AMD Radeon RX 550 4GB, Windows 10 (Renewed)",
      price: "$289.99",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/716+YZy3q6L._AC_UY218_.jpg",
      vendor: "Dell",
    },
    {
      title:
        "HP Pavilion Desktop PC, 12th Gen Intel Core i7-12700, 12 GB SDRAM, 512 GB SSD, Windows 11 Home, Wi-Fi 6 & Bluetooth, 9 USB Ports, Wired Keyboard & Mouse Combo, Pre-Built PC Tower (TP01-3070, 2022)",
      price: "$728.95",
      "striked-price": "$879.99",
      image: "https://m.media-amazon.com/images/I/61uhyvOg3ZL._AC_UY218_.jpg",
      vendor: "HP",
    },
    {
      title:
        "2020 Apple MacBook Air Laptop: Apple M1 Chip, 13 Retina Display, 8GB RAM, 256GB SSD Storage, Backlit Keyboard, FaceTime HD Camera, Touch ID. Works with iPhone/iPad; Silver",
      price: "$799.99",
      "striked-price": "$999.00",
      image: "https://m.media-amazon.com/images/I/71TPda7cwUL._AC_UY218_.jpg",
      vendor: "Apple",
    },
    {
      title:
        'Lenovo IdeaCentre AIO 3i 22" All-in-One Computer, Intel Core i3-1115G4, FHD Touch Display, 8GB RAM, 256GB SSD, DVD RW Drive, Windows 11',
      price: "$659.92",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/71ZOH88uZlL._AC_UY218_.jpg",
      vendor: "Lenovo",
    },
    {
      title:
        "HP EliteDesk 800 G1 Desktop, Intel Core i7 4770 3.4Ghz, 32GB DDR3 RAM, 1TB SSD Hard Drive, USB 3.0, DVDRW, Windows 10 Pro (Renewed)",
      price: "$241.95",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/61PLUeR9MoS._AC_UY218_.jpg",
      vendor: "HP",
    },
    {
      title:
        '2022 Acer 15.6" FHD IPS Touchscreen Chromebook, Intel Dual-Core Celeron N Processor Up to 2.50GHz, 4GB RAM, 32GB SSD, Numeric Keypad, Ultra-Fast WiFi, Chrome OS-(Renewed)',
      price: "$169.99",
      "striked-price": "$199.99",
      image: "https://m.media-amazon.com/images/I/61GWu+CHIKL._AC_UY218_.jpg",
      vendor: "Acer",
    },
    {
      title:
        "Microsoft Authorized Refurbished- HP Elite Desktop PC Computer Intel Core i5 3.1-GHz, 8 gb Ram, 1 TB Hard Drive, DVDRW, 19 Inch LCD Monitor, Keyboard, Mouse, USB WiFi, Windows 10 (Renewed)",
      price: "$135.00",
      "striked-price": "$144.80",
      image: "https://m.media-amazon.com/images/I/61VPDEbYGQL._AC_UY218_.jpg",
      vendor: "HP",
    },
    {
      title:
        "2022 Apple MacBook Pro Laptop with M2 chip: 13-inch Retina Display, 8GB RAM, 512GB SSD Storage, Touch Bar, Backlit Keyboard, FaceTime HD Camera. Works with iPhone and iPad; Silver",
      price: "$1,349.99",
      "striked-price": "$1,499.00",
      image: "https://m.media-amazon.com/images/I/61bX2AoGj2L._AC_UY218_.jpg",
      vendor: "Apple",
    },
    {
      title:
        "Dell XPS 13 9310 Touchscreen Laptop 13.4-inch UHD+ Thin and Light, Intel Core i7-1195G7, 16GB LPDDR4x RAM, 512G SSD, Intel Iris Xe Graphics, Windows 11 Home, 1-Year Preminum Support - Platinum Silver",
      price: "$1,649.99",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/91MXLpouhoL._AC_UY218_.jpg",
      vendor: "Dell",
    },
    {
      title:
        "2020 Apple MacBook Air Laptop: Apple M1 Chip, 13 Retina Display, 8GB RAM, 256GB SSD Storage, Backlit Keyboard, FaceTime HD Camera, Touch ID. Works with iPhone/iPad; Silver",
      price: "$799.99",
      "striked-price": "$999.00",
      image: "https://m.media-amazon.com/images/I/71TPda7cwUL._AC_UL320_.jpg",
      vendor: "Apple",
    },
    {
      title:
        "2022 Apple MacBook Pro Laptop with M2 chip: 13-inch Retina Display, 8GB RAM, 512GB SSD Storage, Touch Bar, Backlit Keyboard, FaceTime HD Camera. Works with iPhone and iPad; Silver",
      price: "$1,349.99",
      "striked-price": "$1,499.00",
      image: "https://m.media-amazon.com/images/I/61bX2AoGj2L._AC_UL320_.jpg",
      vendor: "Apple",
    },
    {
      title:
        'HP All-in-One Desktop, 21.5" FHD Display, Intel Celeron J4025 Processor, 16GB DDR4 RAM, 512GB PCIe SSD, Webcam, Wi-Fi, HDMI, RJ-45, Wired Keyboard&Mouse, Windows 11 Home, White',
      price: "$599.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/91-CdWQGWAL._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        '2022 Newest HP All-in-One Desktop, 21.5" FHD Display, Intel Celeron J4025 Processor, 8GB RAM, 256GB PCIe SSD, Webcam, WiFi, HDMI, RJ-45, Wired Keyboard&Mouse, Windows 11 Home, White',
      price: "$589.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/91f9y+HBacL._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        "Dell Inspiron 24 5000 11th Gen Intel i5-1135G7 12GB 1TB HDD 256GB SSD 23.8-inch Full HD Touchscreen All-in-One PC",
      price: "$708.98",
      "striked-price": "$999.95",
      image: "https://m.media-amazon.com/images/I/81wMa6LQVzL._AC_UL320_.jpg",
      vendor: "Dell",
    },
    {
      title:
        "Dell Inspiron 7710 All in One - 27-inch FHD (1920 x 1080) Touchscreen Display, Intel Core i7-1255U, 32GB DDR4, 1TB SSD, NVIDIA GeForce MX550, Intel Wi-Fi 6E, Dell Services, Windows 11 Pro - White",
      price: "$1,299.99",
      "striked-price": "$1,479.99",
      image: "https://m.media-amazon.com/images/I/71uaW7oluqL._AC_UL320_.jpg",
      vendor: "Dell",
    },
    {
      title:
        "HP Flagship Pro Desktop 2018 Computer, Core I5 Up to 3.6GHz, 8GB, 512GB SSD, WiFi, DVD, DP, VGA, USB 3.0, Windows 10 Pro 64 Bit-Multi Language-English/Spanish/French(CI5) (Renewed)",
      price: "$121.86",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/61Ob1TXMkCL._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        "Dell Optiplex 9020 SFF High Performance Desktop Computer, Intel Core i7-4790 up to 4.0GHz, 16GB RAM, 960GB SSD, Windows 10 Pro, USB WiFi Adapter, (Renewed)",
      price: "$224.97",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/61pskHRSN2L._AC_UL320_.jpg",
      vendor: "Dell",
    },
    {
      title:
        "HP Elite Desktop Computer Package - Windows 10 Professional, Intel Quad Core i5 3.2GHz, 8GB RAM, 500GB HDD, 22inch LCD Monitor, Keyboard, Mouse, WiFi (Renewed)",
      price: "$145.25",
      "striked-price": "$154.99",
      image: "https://m.media-amazon.com/images/I/61CltMS60lL._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        "Dell Optiplex 780 SFF Desktop PC - Intel Core 2 Duo 3.0GHz 4GB 160GB Windows Pro (64bit) (Renewed)",
      price: "$150.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/711UbGiroQL._AC_UL320_.jpg",
      vendor: "Dell",
    },
    {
      title:
        'HP EliteBook 830 G5 Laptop 13.3" FHD | 1.7GHz Intel Core i5-8350U Quad-Core | 8GB DDR4 | 256GB SSD | Win10Pro (Renewed)',
      price: "$218.00",
      "striked-price": "$239.99",
      image: "https://m.media-amazon.com/images/I/61ZuyYGzTvL._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        "HP Pavilion Desktop PC, 12th Gen Intel Core i5-12400, 8 GB RAM, 512 GB SSD, Windows 11 Home, Wi-Fi 6 & Bluetooth, 9 USB Ports, Wired Keyboard & Mouse Combo, Pre-Built PC Tower (TP01-3050, 2022)",
      price: "$529.99",
      "striked-price": "$679.99",
      image: "https://m.media-amazon.com/images/I/71xtQO5dsdL._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        '2022 Newest HP All-in-One Desktop, 21.5" FHD Display, Intel Celeron J4025 Processor, 16GB RAM, 1TB PCIe SSD, Webcam, HDMI, RJ-45, Wired Keyboard&Mouse, WiFi, Windows 11 Home, White',
      price: "$659.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/91y6RqUyBiL._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        "Dell XPS 13 9310 Touchscreen Laptop 13.4-inch UHD+ Thin and Light, Intel Core i7-1195G7, 16GB LPDDR4x RAM, 512G SSD, Intel Iris Xe Graphics, Windows 11 Home, 1-Year Preminum Support - Platinum Silver",
      price: "$1,649.99",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/91MXLpouhoL._AC_UL320_.jpg",
      vendor: "Dell",
    },
    {
      title:
        '2022 Newest HP 17 Laptop, 17.3" FHD IPS Display, Intel Core i5-1135G7 Quad-Core Processor, Intel Iris Xe Graphics, 16GB RAM, 1TB PCIe SSD, HDMI, Windows 11 + Microfiber Cloth',
      price: "$642.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/71iEZty7r2L._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        "Dell OptiPlex 7050 MFF Intel Core i5-6600T 8GB 128GB Desktop PC Refurbished Window 10 Professional with Keyboard and Mouse (Renewed)",
      price: "$129.00",
      "striked-price": "$148.99",
      image: "https://m.media-amazon.com/images/I/61PdvvbqU9L._AC_UL320_.jpg",
      vendor: "Dell",
    },
    {
      title:
        "2022 HP Pavilion TP01 Desktop Computer, AMD Ryzen 3-5300G (Beats Core i5-10400), AMD Radeon, 9 USB Ports, Wireless-AC, Bluetooth, HDMI, Windows 11 Home (16GB RAM | 1TB PCIe SSD)",
      price: "$589.99",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/71-V7MoibBL._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        "Dell OptiPlex 7020 Desktop Computer, 32GB Ram New 2TB SSD, Intel Quad Core i7 4790 up to 4.0GHz, AC8260 Built-in WiFi 5, Dual Monitor Supported, DVD-RW HDMI Windows 10 Pro (Renewed)",
      price: "$419.98",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/61w02pgRLGL._AC_UL320_.jpg",
      vendor: "Dell",
    },
    {
      title:
        "2020 Apple MacBook Air Laptop: Apple M1 Chip, 13 Retina Display, 8GB RAM, 256GB SSD Storage, Backlit Keyboard, FaceTime HD Camera, Touch ID. Works with iPhone/iPad; Silver",
      price: "$799.99",
      "striked-price": "$999.00",
      image: "https://m.media-amazon.com/images/I/71TPda7cwUL._AC_UL320_.jpg",
      vendor: "Apple",
    },
    {
      title:
        'HP All-in-One Desktop, 21.5" FHD Display, Intel Celeron J4025 Processor, 16GB DDR4 RAM, 512GB PCIe SSD, Webcam, Wi-Fi, HDMI, RJ-45, Wired Keyboard&Mouse, Windows 11 Home, White',
      price: "$599.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/91-CdWQGWAL._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        '2022 Newest HP All-in-One Desktop, 21.5" FHD Display, Intel Celeron J4025 Processor, 8GB RAM, 256GB PCIe SSD, Webcam, WiFi, HDMI, RJ-45, Wired Keyboard&Mouse, Windows 11 Home, White',
      price: "$589.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/91f9y+HBacL._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        "2022 Apple MacBook Pro Laptop with M2 chip: 13-inch Retina Display, 8GB RAM, 512GB SSD Storage, Touch Bar, Backlit Keyboard, FaceTime HD Camera. Works with iPhone and iPad; Silver",
      price: "$1,349.99",
      "striked-price": "$1,499.00",
      image: "https://m.media-amazon.com/images/I/61bX2AoGj2L._AC_UL320_.jpg",
      vendor: "Apple",
    },
    {
      title:
        "2021 Apple MacBook Pro (16-inch, Apple M1 Max chip with 10core CPU and 32core GPU, 32GB RAM, 1TB SSD) - Space Gray",
      price: "$3,099.00",
      "striked-price": "$3,499.00",
      image: "https://m.media-amazon.com/images/I/61aUBxqc5PL._AC_UL320_.jpg",
      vendor: "Apple",
    },
    {
      title:
        "Dell XPS 13 9310 Touchscreen Laptop 13.4-inch UHD+ Thin and Light, Intel Core i7-1195G7, 16GB LPDDR4x RAM, 512G SSD, Intel Iris Xe Graphics, Windows 11 Home, 1-Year Preminum Support - Platinum Silver",
      price: "$1,649.99",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/91MXLpouhoL._AC_UL320_.jpg",
      vendor: "Dell",
    },
    {
      title:
        '2022 Newest HP All-in-One Desktop, 21.5" FHD Display, Intel Celeron J4025 Processor, 16GB RAM, 1TB PCIe SSD, Webcam, HDMI, RJ-45, Wired Keyboard&Mouse, WiFi, Windows 11 Home, White',
      price: "$659.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/91y6RqUyBiL._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        "2021 Apple MacBook Pro (14-inch, Apple M1 Pro chip with 8core CPU and 14core GPU, 16GB RAM, 512GB SSD) - Silver",
      price: "$1,599.99",
      "striked-price": "$1,999.00",
      image: "https://m.media-amazon.com/images/I/61cCf94xIEL._AC_UL320_.jpg",
      vendor: "Apple",
    },
    {
      title:
        "Portable Monitor SVANTTO [2022 Latest] FHD 15.6'' Portable Screen for Laptop 400Nits Brightness Travel Monitor, 100% sRGB 1080P Laptop Monitor Extender, Mac Xbox PS5 Computer Display with HDMI Cable",
      price: "$118.99",
      "striked-price": "$149.99",
      image: "https://m.media-amazon.com/images/I/618O1Tz8gIL._AC_UL320_.jpg",
      vendor: "SVANTTO",
    },
    {
      title:
        "2020 Apple MacBook Air Laptop: Apple M1 Chip, 13 Retina Display, 8GB RAM, 256GB SSD Storage, Backlit Keyboard, FaceTime HD Camera, Touch ID. Works with iPhone/iPad; Silver",
      price: "$799.99",
      "striked-price": "$999.00",
      image: "https://m.media-amazon.com/images/I/71TPda7cwUL._AC_UL320_.jpg",
      vendor: "Apple",
    },
    {
      title:
        '2022 Newest HP All-in-One Desktop, 21.5" FHD Display, Intel Celeron J4025 Processor, 8GB RAM, 256GB PCIe SSD, Webcam, WiFi, HDMI, RJ-45, Wired Keyboard&Mouse, Windows 11 Home, White',
      price: "$589.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/91f9y+HBacL._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        'HP All-in-One Desktop, 21.5" FHD Display, Intel Celeron J4025 Processor, 16GB DDR4 RAM, 512GB PCIe SSD, Webcam, Wi-Fi, HDMI, RJ-45, Wired Keyboard&Mouse, Windows 11 Home, White',
      price: "$599.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/91-CdWQGWAL._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        "2022 Apple MacBook Pro Laptop with M2 chip: 13-inch Retina Display, 8GB RAM, 512GB SSD Storage, Touch Bar, Backlit Keyboard, FaceTime HD Camera. Works with iPhone and iPad; Silver",
      price: "$1,349.99",
      "striked-price": "$1,499.00",
      image: "https://m.media-amazon.com/images/I/61bX2AoGj2L._AC_UL320_.jpg",
      vendor: "Apple",
    },
    {
      title:
        "2021 Apple MacBook Pro (16-inch, Apple M1 Max chip with 10core CPU and 32core GPU, 32GB RAM, 1TB SSD) - Space Gray",
      price: "$3,099.00",
      "striked-price": "$3,499.00",
      image: "https://m.media-amazon.com/images/I/61aUBxqc5PL._AC_UL320_.jpg",
      vendor: "Apple",
    },
    {
      title:
        "Dell OptiPlex 7020 Desktop Computer, 32GB Ram New 2TB SSD, Intel Quad Core i7 4790 up to 4.0GHz, AC8260 Built-in WiFi 5, Dual Monitor Supported, DVD-RW HDMI Windows 10 Pro (Renewed)",
      price: "$419.98",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/61w02pgRLGL._AC_UL320_.jpg",
      vendor: "Dell",
    },
    {
      title:
        'Rongta Android 11 Barcode Scanner, Handheld PDA Data Terminal Mobile Computer with 5.5" HD Touch Screen, WiFi&4G LTE 1D 2D QR Barcode Scanner for Retail Warehouse',
      price: "$599.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/61LpXqNuDQL._AC_UL320_.jpg",
      vendor: "Rongta",
    },
    {
      title:
        "2021 Apple MacBook Pro (14-inch, Apple M1 Pro chip with 8core CPU and 14core GPU, 16GB RAM, 512GB SSD) - Silver",
      price: "$1,599.99",
      "striked-price": "$1,999.00",
      image: "https://m.media-amazon.com/images/I/61cCf94xIEL._AC_UL320_.jpg",
      vendor: "Apple",
    },
    {
      title:
        "Dell XPS 13 9310 Touchscreen Laptop 13.4-inch UHD+ Thin and Light, Intel Core i7-1195G7, 16GB LPDDR4x RAM, 512G SSD, Intel Iris Xe Graphics, Windows 11 Home, 1-Year Preminum Support - Platinum Silver",
      price: "$1,649.99",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/91MXLpouhoL._AC_UL320_.jpg",
      vendor: "Dell",
    },
    {
      title:
        "2020 Apple MacBook Air Laptop: Apple M1 Chip, 13 Retina Display, 8GB RAM, 256GB SSD Storage, Backlit Keyboard, FaceTime HD Camera, Touch ID. Works with iPhone/iPad; Silver",
      price: "$799.99",
      "striked-price": "$999.00",
      image: "https://m.media-amazon.com/images/I/71TPda7cwUL._AC_UL320_.jpg",
      vendor: "Apple",
    },
    {
      title:
        '2022 Newest HP All-in-One Desktop, 21.5" FHD Display, Intel Celeron J4025 Processor, 8GB RAM, 256GB PCIe SSD, Webcam, WiFi, HDMI, RJ-45, Wired Keyboard&Mouse, Windows 11 Home, White',
      price: "$589.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/91f9y+HBacL._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        '2022 Newest HP All-in-One Desktop, 21.5" FHD Display, Intel Celeron J4025 Processor, 12GB RAM, 256GB PCIe SSD, Webcam, HDMI, RJ-45, Wired Keyboard&Mouse, WiFi, Windows 11 Home, White',
      price: "$599.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/91-CdWQGWAL._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        "2022 Apple MacBook Pro Laptop with M2 chip: 13-inch Retina Display, 8GB RAM, 512GB SSD Storage, Touch Bar, Backlit Keyboard, FaceTime HD Camera. Works with iPhone and iPad; Silver",
      price: "$1,349.99",
      "striked-price": "$1,499.00",
      image: "https://m.media-amazon.com/images/I/61bX2AoGj2L._AC_UL320_.jpg",
      vendor: "Apple",
    },
    {
      title:
        "Dell OptiPlex 7020 Desktop Computer, 32GB Ram New 2TB SSD, Intel Quad Core i7 4790 up to 4.0GHz, AC8260 Built-in WiFi 5, Dual Monitor Supported, DVD-RW HDMI Windows 10 Pro (Renewed)",
      price: "$419.98",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/61w02pgRLGL._AC_UL320_.jpg",
      vendor: "Dell",
    },
    {
      title:
        "Dell XPS 13 9310 Touchscreen Laptop 13.4-inch UHD+ Thin and Light, Intel Core i7-1195G7, 16GB LPDDR4x RAM, 512G SSD, Intel Iris Xe Graphics, Windows 11 Home, 1-Year Preminum Support - Platinum Silver",
      price: "$1,649.99",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/91MXLpouhoL._AC_UL320_.jpg",
      vendor: "Dell",
    },
    {
      title:
        "2021 Apple MacBook Pro (16-inch, Apple M1 Max chip with 10core CPU and 32core GPU, 32GB RAM, 1TB SSD) - Space Gray",
      price: "$3,099.00",
      "striked-price": "$3,499.00",
      image: "https://m.media-amazon.com/images/I/61aUBxqc5PL._AC_UL320_.jpg",
      vendor: "Apple",
    },
    {
      title:
        'Rongta Android 11 Barcode Scanner, Handheld PDA Data Terminal Mobile Computer with 5.5" HD Touch Screen, WiFi&4G LTE 1D 2D QR Barcode Scanner for Retail Warehouse',
      price: "$599.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/61LpXqNuDQL._AC_UL320_.jpg",
      vendor: "Rongta",
    },
    {
      title:
        "Portable Monitor SVANTTO [2022 Latest] FHD 15.6'' Portable Screen for Laptop 400Nits Brightness Travel Monitor, 100% sRGB 1080P Laptop Monitor Extender, Mac Xbox PS5 Computer Display with HDMI Cable",
      price: "$118.99",
      "striked-price": "$149.99",
      image: "https://m.media-amazon.com/images/I/618O1Tz8gIL._AC_UL320_.jpg",
      vendor: "SVANTTO",
    },
    {
      title:
        "2020 Apple MacBook Air Laptop: Apple M1 Chip, 13 Retina Display, 8GB RAM, 256GB SSD Storage, Backlit Keyboard, FaceTime HD Camera, Touch ID. Works with iPhone/iPad; Silver",
      price: "$799.99",
      "striked-price": "$999.00",
      image: "https://m.media-amazon.com/images/I/71TPda7cwUL._AC_UY218_.jpg",
      vendor: "Apple",
    },
    {
      title:
        'HP All-in-One Desktop, 21.5" FHD Display, Intel Celeron J4025 Processor, 16GB DDR4 RAM, 512GB PCIe SSD, Webcam, Wi-Fi, HDMI, RJ-45, Wired Keyboard&Mouse, Windows 11 Home, White',
      price: "$599.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/91-CdWQGWAL._AC_UY218_.jpg",
      vendor: "HP",
    },
    {
      title:
        "HP 600 G1 SFF Computer Desktop PC, Intel Core i7 3.4GHz Processor, 16GB Ram, 128GB M.2 SSD, 2TB HDD, Wireless Keyboard Mouse, WiFi | Bluetooth, New HP Dual 27 FHD LED Monitor, Windows 10 (Renewed)",
      price: "$619.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/71LOjWjeuLL._AC_UY218_.jpg",
      vendor: "HP",
    },
    {
      title:
        "Dell Optiplex 7010 SFF Desktop PC - Intel Core i5-3470 3.2GHz 4GB 250GB DVD Windows 10 Pro (Renewed)",
      price: "$92.00",
      "striked-price": "$101.00",
      image: "https://m.media-amazon.com/images/I/81Bymeg4wKL._AC_UY218_.jpg",
      vendor: "Dell",
    },
    {
      title:
        "Lenovo V50T Gen 2 Desktop Tower, Intel i9-11900 Upto 5.2 GHz, 64GB RAM 2TB NVMe SSD, UHD Graphics 750, DisplayPort, HDMI, VGA, DVD, Card Reader, AC Wi-Fi, Bluetooth  Windows 11 Pro",
      price: "$1,349.99",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/71CVD2-AzLL._AC_UY218_.jpg",
      vendor: "Lenovo",
    },
    {
      title:
        "HP Envy Desktop Computer, Intel UHD Graphics 770, 12th Gen Intel Core Processor, 16 GB RAM, 512 GB SSD, Windows 11 Home OS, USB Ports, HP QuickDrop, Wi-Fi 6 & Bluetooth Combo (TE01-3020, 2022)",
      price: "$789.99",
      "striked-price": "$959.99",
      image: "https://m.media-amazon.com/images/I/61jMTWRaQuL._AC_UY218_.jpg",
      vendor: "HP",
    },
    {
      title:
        "HP Stream 11 Laptop, Intel Celeron N4020, 4 GB RAM, 64 GB Storage, 11.6 HD Anti-Glare Display, Windows 11, Long Battery Life, Thin & Portable, Includes Microsoft 365 (11-ak0040nr, 2021 Diamond White)",
      price: "$179.99",
      "striked-price": "$249.99",
      image: "https://m.media-amazon.com/images/I/81hR1tPG+ZL._AC_UY218_.jpg",
      vendor: "HP",
    },
    {
      title:
        "Dell ChromeBook 11.6 Inch HD (1366 x 768) Laptop NoteBook PC, Intel Celeron N2840, Camera, HDMI, WIFI, USB 3.0, SD Card Reader (Renewed)",
      price: "$69.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/51JHD88IlbL._AC_UY218_.jpg",
      vendor: "Dell",
    },
    {
      title:
        "2022 Apple MacBook Pro Laptop with M2 chip: 13-inch Retina Display, 8GB RAM, 512GB SSD Storage, Touch Bar, Backlit Keyboard, FaceTime HD Camera. Works with iPhone and iPad; Silver",
      price: "$1,349.99",
      "striked-price": "$1,499.00",
      image: "https://m.media-amazon.com/images/I/61bX2AoGj2L._AC_UY218_.jpg",
      vendor: "Apple",
    },
    {
      title:
        "HP Pavilion Gaming Desktop, AMD Radeon RX 5500, AMD Ryzen 3 5300G Processor, 8 GB RAM, 512 GB SSD, Windows 11 Home, 9 USB Ports, Keyboard and Mouse Combo, Pre-Built PC Tower (TG01-2022, 2022)",
      price: "$529.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/81YNP1bMLpL._AC_UY218_.jpg",
      vendor: "HP",
    },
    {
      title:
        'Acer Aspire C27-1700-UA91 AIO Desktop | 27" Full HD IPS Display | 12th Gen Intel Core i5-1235U | Intel Iris Xe Graphics | 16GB DDR4 | 512GB NVMe M.2 SSD | Intel Wireless Wi-Fi 6 | Windows 11 Home',
      price: "$899.99",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/81dTtDkmTXL._AC_UY218_.jpg",
      vendor: "Acer",
    },
    {
      title:
        "Dell Inspiron 3910 Desktop, 12th Gen Intel Core i5-12400 Processor, 32GB DDR4 RAM, 1TB SSD, HDMI, DP, DVD-RW, Bluetooth, Wired Keyboard&Mouse, Wi-Fi 6, Windows 11 Home, Black",
      price: "$813.01",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/71quK39PJ-L._AC_UY218_.jpg",
      vendor: "Dell",
    },
    {
      title:
        "2022 HP Pavilion TP01 Desktop Computer, AMD Ryzen 3-5300G (Beats Core i5-10400), AMD Radeon, 9 USB Ports, Wireless-AC, Bluetooth, HDMI, Windows 11 Home (16GB RAM | 1TB PCIe SSD)",
      price: "$589.99",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/71-V7MoibBL._AC_UY218_.jpg",
      vendor: "HP",
    },
    {
      title:
        'HP 21.5" All-in-One Desktop, Intel Pentium Silver J5040 Processor, Intel UHD Graphics 605, 4 GB RAM, 128 GB Storage, Windows 11 Home (22-dd0120, 2021)',
      price: "$379.99",
      "striked-price": "$409.99",
      image: "https://m.media-amazon.com/images/I/81irrGY4jTL._AC_UY218_.jpg",
      vendor: "HP",
    },
    {
      title:
        "2021 Apple MacBook Pro (16-inch, Apple M1 Max chip with 10core CPU and 32core GPU, 32GB RAM, 1TB SSD) - Space Gray",
      price: "$3,099.00",
      "striked-price": "$3,499.00",
      image: "https://m.media-amazon.com/images/I/61aUBxqc5PL._AC_UY218_.jpg",
      vendor: "Apple",
    },
    {
      title:
        '2022 Newest HP All-in-One Desktop, 21.5" FHD Display, Intel Celeron J4025 Processor, 8GB RAM, 256GB PCIe SSD, Webcam, WiFi, HDMI, RJ-45, Wired Keyboard&Mouse, Windows 11 Home, White',
      price: "$589.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/91f9y+HBacL._AC_UY218_.jpg",
      vendor: "HP",
    },
    {
      title:
        "2020 Apple MacBook Air Laptop: Apple M1 Chip, 13 Retina Display, 8GB RAM, 256GB SSD Storage, Backlit Keyboard, FaceTime HD Camera, Touch ID. Works with iPhone/iPad; Silver",
      price: "$799.99",
      "striked-price": "$999.00",
      image: "https://m.media-amazon.com/images/I/71TPda7cwUL._AC_UL320_.jpg",
      vendor: "Apple",
    },
    {
      title:
        '2022 Newest HP All-in-One Desktop, 21.5" FHD Display, Intel Celeron J4025 Processor, 8GB RAM, 256GB PCIe SSD, Webcam, WiFi, HDMI, RJ-45, Wired Keyboard&Mouse, Windows 11 Home, White',
      price: "$589.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/91f9y+HBacL._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        'HP All-in-One Desktop, 21.5" FHD Display, Intel Celeron J4025 Processor, 16GB DDR4 RAM, 512GB PCIe SSD, Webcam, Wi-Fi, HDMI, RJ-45, Wired Keyboard&Mouse, Windows 11 Home, White',
      price: "$599.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/91-CdWQGWAL._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        "2022 Apple MacBook Pro Laptop with M2 chip: 13-inch Retina Display, 8GB RAM, 512GB SSD Storage, Touch Bar, Backlit Keyboard, FaceTime HD Camera. Works with iPhone and iPad; Silver",
      price: "$1,349.99",
      "striked-price": "$1,499.00",
      image: "https://m.media-amazon.com/images/I/61bX2AoGj2L._AC_UL320_.jpg",
      vendor: "Apple",
    },
    {
      title:
        "2021 Apple MacBook Pro (16-inch, Apple M1 Max chip with 10core CPU and 32core GPU, 32GB RAM, 1TB SSD) - Space Gray",
      price: "$3,099.00",
      "striked-price": "$3,499.00",
      image: "https://m.media-amazon.com/images/I/61aUBxqc5PL._AC_UL320_.jpg",
      vendor: "Apple",
    },
    {
      title:
        "Dell XPS 13 9310 Touchscreen Laptop 13.4-inch UHD+ Thin and Light, Intel Core i7-1195G7, 16GB LPDDR4x RAM, 512G SSD, Intel Iris Xe Graphics, Windows 11 Home, 1-Year Preminum Support - Platinum Silver",
      price: "$1,649.99",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/91MXLpouhoL._AC_UL320_.jpg",
      vendor: "Dell",
    },
    {
      title:
        '2022 Newest HP All-in-One Desktop, 21.5" FHD Display, Intel Celeron J4025 Processor, 16GB RAM, 1TB PCIe SSD, Webcam, HDMI, RJ-45, Wired Keyboard&Mouse, WiFi, Windows 11 Home, White',
      price: "$659.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/91y6RqUyBiL._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        "Dell OptiPlex 7020 Desktop Computer, 32GB Ram New 2TB SSD, Intel Quad Core i7 4790 up to 4.0GHz, AC8260 Built-in WiFi 5, Dual Monitor Supported, DVD-RW HDMI Windows 10 Pro (Renewed)",
      price: "$419.98",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/61w02pgRLGL._AC_UL320_.jpg",
      vendor: "Dell",
    },
    {
      title:
        "Portable Monitor SVANTTO [2022 Latest] FHD 15.6'' Portable Screen for Laptop 400Nits Brightness Travel Monitor, 100% sRGB 1080P Laptop Monitor Extender, Mac Xbox PS5 Computer Display with HDMI Cable",
      price: "$118.99",
      "striked-price": "$149.99",
      image: "https://m.media-amazon.com/images/I/618O1Tz8gIL._AC_UL320_.jpg",
      vendor: "SVANTTO",
    },
    {
      title:
        'HP 27 All-in-One Desktop, 27" FHD Screen, AMD Ryzen 5 5625U Processor, 32GB DDR4 RAM, 512GB PCIe SSD + 1TB HDD, Pop-up Webcam, RJ45, HDMI, Wi-Fi 6, Wired KB & Mouse, Windows 11 Home, Black',
      price: "$1,059.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/71KAj+xnOtL._AC_UY218_.jpg",
      vendor: "HP",
    },
    {
      title:
        'Lenovo IdeaCentre 5i All-in-One Business Desktop, 23.8" FHD IPS Touchscreen, Intel Core i5-10400T, 64GB RAM, 1TB SSD, Webcam, HDMI, Wireless Keyboard&Mouse, Wireless Charger, Wi-Fi, Windows 11 Pro',
      price: "$1,209.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/81KDR9SR3WL._AC_UY218_.jpg",
      vendor: "Lenovo",
    },
    {
      title:
        "Dell Chromebook 11 3180 83C80 11.6-Inch Traditional Laptop (Black) (Renewed)",
      price: "$59.00",
      "striked-price": "$68.00",
      image: "https://m.media-amazon.com/images/I/617myiTpYRL._AC_UY218_.jpg",
      vendor: "Dell",
    },
    {
      title:
        'HP All-in-One Desktop, 21.5" FHD Display, Intel Celeron J4025 Processor, 16GB DDR4 RAM, 1TB PCIe SSD, Webcam, Wi-Fi, HDMI, RJ-45, Wired Keyboard&Mouse, Windows 11 Home, White',
      price: "$649.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/81+TThIUtXL._AC_UY218_.jpg",
      vendor: "HP",
    },
    {
      title:
        "HP Stream 11.6-inch HD Non-Touch, 64GB eMMC, Intel Celeron N4020 Laptop (4GB RAM, Intel UHD 600 Graphics, SD Card Reader, 14 Hour Battery, Windows 11 Home S) Diamond White, 11-ak0013dx (Renewed)",
      price: "$164.95",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/61zEU-XhDbL._AC_UY218_.jpg",
      vendor: "HP",
    },
    {
      title:
        'HP 21.5" All-in-One Desktop, AMD Athlon Silver 3050U Processor, AMD Radeon Graphics, 4 GB RAM, 128 GB Storage, Windows 10 Home (22-dd0110, 2021)',
      price: "$389.99",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/81iyD5MWARL._AC_UY218_.jpg",
      vendor: "HP",
    },
    {
      title:
        "2020 Apple MacBook Air Laptop: Apple M1 Chip, 13 Retina Display, 8GB RAM, 256GB SSD Storage, Backlit Keyboard, FaceTime HD Camera, Touch ID. Works with iPhone/iPad; Silver",
      price: "$799.99",
      "striked-price": "$999.00",
      image: "https://m.media-amazon.com/images/I/71TPda7cwUL._AC_UY218_.jpg",
      vendor: "Apple",
    },
    {
      title:
        "2022 Apple MacBook Pro Laptop with M2 chip: 13-inch Retina Display, 8GB RAM, 512GB SSD Storage, Touch Bar, Backlit Keyboard, FaceTime HD Camera. Works with iPhone and iPad; Silver",
      price: "$1,349.99",
      "striked-price": "$1,499.00",
      image: "https://m.media-amazon.com/images/I/61bX2AoGj2L._AC_UY218_.jpg",
      vendor: "Apple",
    },
    {
      title:
        '2020 HP 14" HD (1366 x 768) Thin and Light Laptop PC, Intel Celeron N4020 Dual-Core Processor, 4GB DDR4 Memory, 64GB eMMC, HDMI, WiFi, Bluetooth, Windows 10 S, 1 Year Microsoft 365, Snowflake White',
      price: "$219.99",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/71IyteItZhL._AC_UY218_.jpg",
      vendor: "HP",
    },
    {
      title:
        "Dell Optiplex 7010 SFF Desktop PC - Intel Core i5-3470 3.2GHz 4GB 250GB DVD Windows 10 Pro (Renewed)",
      price: "$92.00",
      "striked-price": "$101.00",
      image: "https://m.media-amazon.com/images/I/81Bymeg4wKL._AC_UY218_.jpg",
      vendor: "Dell",
    },
    {
      title:
        "HP Pavilion Gaming Desktop, NVIDIA GeForce GTX 1650 SUPER, Intel Core i3-10100, 8 GB DDR4 RAM, 256 GB PCIe NVMe SSD, Windows 11, USB Mouse and Keyboard, Compact Tower Design (TG01-1022, 2020)",
      price: "$613.95",
      "striked-price": "$739.99",
      image: "https://m.media-amazon.com/images/I/81liWNg7JzL._AC_UY218_.jpg",
      vendor: "HP",
    },
    {
      title:
        "HP 27 All-in-One Desktop, AMD Ryzen 5 5500U, 16 GB RAM, 512 GB SSD, Full HD IPS Touchscreen, Windows 11 Home, 4 USB Ports, Privacy Camera, Dual Mics, Wireless Keyboard and Mouse (27-cb0060, 2021)",
      price: "$1,034.99",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/81GNWNoBlPL._AC_UY218_.jpg",
      vendor: "HP",
    },
    {
      title:
        'HP - 14" Laptop - AMD Ryzen 3 - 8GB Memory - 128GB SSD - Natural Silver - Model 14-fq0033dx',
      price: "$279.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/81gNI07678L._AC_UY218_.jpg",
      vendor: "HP",
    },
    {
      title:
        "Dell XPS 13 9310 Touchscreen Laptop 13.4-inch UHD+ Thin and Light, Intel Core i7-1195G7, 16GB LPDDR4x RAM, 512G SSD, Intel Iris Xe Graphics, Windows 11 Home, 1-Year Preminum Support - Platinum Silver",
      price: "$1,649.99",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/91MXLpouhoL._AC_UY218_.jpg",
      vendor: "Dell",
    },
    {
      title:
        "2020 Apple MacBook Air Laptop: Apple M1 Chip, 13 Retina Display, 8GB RAM, 256GB SSD Storage, Backlit Keyboard, FaceTime HD Camera, Touch ID. Works with iPhone/iPad; Silver",
      price: "$799.99",
      "striked-price": "$999.00",
      image: "https://m.media-amazon.com/images/I/71TPda7cwUL._AC_UL320_.jpg",
      vendor: "Apple",
    },
    {
      title:
        'Lenovo IdeaCentre 5i All-in-One Business Desktop, 23.8" FHD IPS Touchscreen, Intel Core i5-10400T, 64GB RAM, 1TB SSD, Webcam, HDMI, Wireless Keyboard&Mouse, Wireless Charger, Wi-Fi, Windows 11 Pro',
      price: "$1,209.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/81KDR9SR3WL._AC_UL320_.jpg",
      vendor: "Lenovo",
    },
    {
      title:
        "2022 Apple MacBook Pro Laptop with M2 chip: 13-inch Retina Display, 8GB RAM, 512GB SSD Storage, Touch Bar, Backlit Keyboard, FaceTime HD Camera. Works with iPhone and iPad; Silver",
      price: "$1,349.99",
      "striked-price": "$1,499.00",
      image: "https://m.media-amazon.com/images/I/61bX2AoGj2L._AC_UL320_.jpg",
      vendor: "Apple",
    },
    {
      title:
        'HP 27 All-in-One Desktop, 27" FHD Screen, AMD Ryzen 5 5625U Processor, 32GB DDR4 RAM, 512GB PCIe SSD + 1TB HDD, Pop-up Webcam, RJ45, HDMI, Wi-Fi 6, Wired KB & Mouse, Windows 11 Home, Black',
      price: "$1,059.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/71KAj+xnOtL._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        'Lenovo IdeaCentre AIO 3i 22" All-in-One Computer, Intel Core i3-1115G4, FHD Touch Display, 8GB RAM, 256GB SSD, DVD RW Drive, Windows 11',
      price: "$659.92",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/71ZOH88uZlL._AC_UL320_.jpg",
      vendor: "Lenovo",
    },
    {
      title:
        "2021 Apple MacBook Pro (16-inch, Apple M1 Max chip with 10core CPU and 32core GPU, 32GB RAM, 1TB SSD) - Space Gray",
      price: "$3,099.00",
      "striked-price": "$3,499.00",
      image: "https://m.media-amazon.com/images/I/61aUBxqc5PL._AC_UL320_.jpg",
      vendor: "Apple",
    },
    {
      title:
        'HP Pavilion 24 Desktop 256GB SSD 2TB HD 64GB RAM (Intel 11th gen Processor w/Six cores and Turbo Boost to 3.9GHz, 64 GB RAM, 256 GB SSD + 2 TB HD, 24" TOUCHSCREEN FullHD,Win 11) PC Computer All-in-One',
      price: "$1,799.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/712u-inlRnL._AC_UL320_.jpg",
      vendor: "HP",
    },
    {
      title:
        "Dell XPS 13 9310 Touchscreen Laptop 13.4-inch UHD+ Thin and Light, Intel Core i7-1195G7, 16GB LPDDR4x RAM, 512G SSD, Intel Iris Xe Graphics, Windows 11 Home, 1-Year Preminum Support - Platinum Silver",
      price: "$1,649.99",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/91MXLpouhoL._AC_UL320_.jpg",
      vendor: "Dell",
    },
    {
      title:
        'Lenovo IdeaCentre 5i AIO 27 Touch 512GB SSD (Intel 10th gen Processor with Six Cores and Turbo Boost to 3.60GHz, 16 GB RAM, 512 GB SSD, 27" QHD Touchscreen, Win 11) Desktop All in One PC Computer',
      price: "$1,699.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/41xQaloWXuL._AC_UL320_.jpg",
      vendor: "Lenovo",
    },
    {
      title:
        "Portable Monitor SVANTTO [2022 Latest] FHD 15.6'' Portable Screen for Laptop 400Nits Brightness Travel Monitor, 100% sRGB 1080P Laptop Monitor Extender, Mac Xbox PS5 Computer Display with HDMI Cable",
      price: "$118.99",
      "striked-price": "$149.99",
      image: "https://m.media-amazon.com/images/I/618O1Tz8gIL._AC_UL320_.jpg",
      vendor: "SVANTTO",
    },
    {
      title:
        "2020 Apple MacBook Air Laptop: Apple M1 Chip, 13 Retina Display, 8GB RAM, 256GB SSD Storage, Backlit Keyboard, FaceTime HD Camera, Touch ID. Works with iPhone/iPad; Silver",
      price: "$799.99",
      "striked-price": "$999.00",
      image: "https://m.media-amazon.com/images/I/71TPda7cwUL._AC_UY218_.jpg",
      vendor: "Apple",
    },
    {
      title:
        '2022 Newest HP All-in-One Desktop, 21.5" FHD Display, Intel Celeron J4025 Processor, 8GB RAM, 256GB PCIe SSD, Webcam, WiFi, HDMI, RJ-45, Wired Keyboard&Mouse, Windows 11 Home, White',
      price: "$589.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/91f9y+HBacL._AC_UY218_.jpg",
      vendor: "HP",
    },
    {
      title:
        "HP Pavilion Desktop PC, AMD Ryzen 7 5700G, 16 GB RAM, 512 GB SSD, Windows 11 Pro, Wi-Fi 5 & Bluetooth Connectivity, 9 USB Ports, Wired Mouse and Keyboard Combo, Pre-Built Tower (TP01-2022, 2021)",
      price: "$782.00",
      "striked-price": "$834.99",
      image: "https://m.media-amazon.com/images/I/71ennRNnj5L._AC_UY218_.jpg",
      vendor: "HP",
    },
    {
      title:
        "Dell Inspiron 3000 Business Laptop, 15.6 HD Display, Intel Pentium Silver N5030 Processor, Windows 11 Pro, 16GB RAM, 1TB HDD, WiFi, HDMI, Webcam, Bluetooth, SD-Card Slot, Carbon Black",
      price: "$599.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/71-Pt77Xy-L._AC_UY218_.jpg",
      vendor: "Dell",
    },
    {
      title:
        "Dell Optiplex 7010 SFF Desktop PC - Intel Core i5-3470 3.2GHz 4GB 250GB DVD Windows 10 Pro (Renewed)",
      price: "$92.00",
      "striked-price": "$101.00",
      image: "https://m.media-amazon.com/images/I/81Bymeg4wKL._AC_UY218_.jpg",
      vendor: "Dell",
    },
    {
      title:
        "HP RGB Gaming Desktop PC, Intel Quad I5 up to 3.6GHz, 16GB RAM, 128G SSD + 2TB, GeForce RTX 2060 6G GDDR6, DVD, WiFi & Bluetooth, RGB Keyboard & Mouse, Win 10 Pro (Renewed)",
      price: "$489.99",
      "striked-price": "$549.99",
      image: "https://m.media-amazon.com/images/I/61ID8qwHWOL._AC_UY218_.jpg",
      vendor: "HP",
    },
    {
      title:
        "Dell Optiplex 5050 Small Form Factor (SFF) Business Desktop PC, Intel i7-7700 Quad-Core 3.6 GHz, 16GB DDR4, 512G NVME SSD Windows 10 Pro (Renewed)",
      price: "$287.50",
      "striked-price": "$369.49",
      image: "https://m.media-amazon.com/images/I/61jxXOoTelL._AC_UY218_.jpg",
      vendor: "Dell",
    },
    {
      title:
        'HP All-in-One PC Desk Computer, 21.5" Full HD Micro-Edge Display, AMD Ryzen 3 Processor, AMD Radeon Graphics, 8 GB SDRAM, 256 GB SSD, Windows11 Home OS, MU-MIMO, Bluetooth, and Wi-Fi (22-dd0032, 2022)',
      price: "$549.99",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/71TXFH2NP3L._AC_UY218_.jpg",
      vendor: "HP",
    },
    {
      title:
        "2022 Apple MacBook Pro Laptop with M2 chip: 13-inch Retina Display, 8GB RAM, 512GB SSD Storage, Touch Bar, Backlit Keyboard, FaceTime HD Camera. Works with iPhone and iPad; Silver",
      price: "$1,349.99",
      "striked-price": "$1,499.00",
      image: "https://m.media-amazon.com/images/I/61bX2AoGj2L._AC_UY218_.jpg",
      vendor: "Apple",
    },
    {
      title:
        'HP All-in-One Desktop, 21.5" FHD Display, Intel Celeron J4025 Processor, 16GB DDR4 RAM, 512GB PCIe SSD, Webcam, Wi-Fi, HDMI, RJ-45, Wired Keyboard&Mouse, Windows 11 Home, White',
      price: "$599.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/91-CdWQGWAL._AC_UY218_.jpg",
      vendor: "HP",
    },
    {
      title:
        'Newest Dell Inspiron 3511 Laptop, 15.6" FHD Touchscreen, Intel Core i5-1035G1, 32GB DDR4 RAM, 1TB PCIe SSD, SD Card Reader, Webcam, HDMI, Wi-Fi, Windows 11 Home, Black',
      price: "$789.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/71y2J2+cmwL._AC_UY218_.jpg",
      vendor: "Dell",
    },
    {
      title:
        'Newest HP 17 Laptop, 17.3" HD+ Display, 11th Gen Intel Core i3-1115G4 Processor, 32GB RAM, 1TB PCIe SSD, Webcam, Bluetooth, HDMI, RJ-45, Windows 11 Home, Silver',
      price: "$554.00",
      "striked-price": "$592.00",
      image: "https://m.media-amazon.com/images/I/81TmwRunqxL._AC_UY218_.jpg",
      vendor: "HP",
    },
    {
      title:
        "Dell OptiPlex 3000 Micro (Latest Model) Intel 12th Gen Core i5-12500T 16GB DDR4 512GB PCIe SSD WiFi + BT Windows 10 Professional",
      price: null,
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/51Z9z45e-7L._AC_UY218_.jpg",
      vendor: "Dell",
    },
    {
      title:
        "Newest Dell Inspiron 24 5000 All-in-One Business Desktop, 23.8 FHD Touchscreen, Intel i5-1135G7, 16GB DDR4 RAM, 512GB SSD, Webcam, Wi-Fi 6, HDMI, Wireless Keyboard&Mouse, Win11 Home, Silver",
      price: "$769.00",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/81HM+xYvnvL._AC_UY218_.jpg",
      vendor: "Dell",
    },
    {
      title:
        "Dell XPS 13 9310 Touchscreen Laptop 13.4-inch UHD+ Thin and Light, Intel Core i7-1195G7, 16GB LPDDR4x RAM, 512G SSD, Intel Iris Xe Graphics, Windows 11 Home, 1-Year Preminum Support - Platinum Silver",
      price: "$1,649.99",
      "striked-price": null,
      image: "https://m.media-amazon.com/images/I/91MXLpouhoL._AC_UY218_.jpg",
      vendor: "Dell",
    },
    {
      title:
        "2021 Apple MacBook Pro (16-inch, Apple M1 Max chip with 10core CPU and 32core GPU, 32GB RAM, 1TB SSD) - Space Gray",
      price: "$3,099.00",
      "striked-price": "$3,499.00",
      image: "https://m.media-amazon.com/images/I/61aUBxqc5PL._AC_UY218_.jpg",
      vendor: "Apple",
    },
  ];
}
