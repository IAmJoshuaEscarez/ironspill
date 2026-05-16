<p align="center">
  <img src="assets/ironimages/ironman.webp" alt="Iron Man Mask" width="150" />
</p>

<h1 align="center">IRONSPILL</h1>

<p align="center"><strong>Automated IoT Crude Oil-Water Separator</strong></p>

<p align="center">
  <a href="#project-abstract--purpose">Overview</a> |
  <a href="#system-logic--engineering-principles">Engineering</a> |
  <a href="#core-subsystems--documentation">Documentation</a> |
  <a href="#project-roster">Team</a>
</p>

## Project Abstract & Purpose
The IronSpill system is an automated, IoT-enabled **Crude Oil-Water Separator** engineered for efficient, cost-effective, and low-maintenance wastewater treatment. The architecture strictly segregates physical fluid dynamics from electronic automation to maximize operational reliability and prevent component fouling.

### System Logic & Engineering Principles

#### 1. Mechanical Separation (Baffle-Gravity Partitioning)
The core separation process is entirely driven by passive fluid dynamics and physics, avoiding complex mechanical moving parts within the fluid:
* **Density-Driven Stratification:** The system utilizes the difference in specific gravity between oil and water. Since oil has a lower density, it naturally floats to the upper stratum of the chamber.
* **Baffle Divider Network:** Specially engineered underflow and overflow baffle walls direct the fluid path. The structural dividers retain and trap the floating oil layer in the primary zone while allowing the heavier, clean water to pass beneath the baffles into subsequent purification chambers.

#### 2. Electronic Automation & Level Monitoring (ESP32 + XKC-Y25)
Electronic automation handles safety, fluid routing, and volumetric monitoring to ensure continuous operations without human intervention:
* **Dielectric Capacitive Sensing:** The system integrates **XKC-Y25 non-contact liquid level sensors** mounted externally on the tank walls. Because water possesses a high dielectric constant ($\approx 80$) compared to air or oil, these sensors accurately detect the presence of water through the tank material without coming into direct contact with contaminants.
* **Threshold Control Logic:** The sensors are calibrated to monitor the absolute **Minimum (Low)** and **Maximum (High)** water levels within the clean water containment zone.
* **ESP32 Microcontroller Execution:** The ESP32 MCU processes state changes from the sensor array in real time. Upon detecting the Maximum water threshold, the MCU activates motorized discharge valves or pumps to drain the clean water. Conversely, when the fluid drops to the Minimum threshold, the MCU halts the discharge process to ensure the upper oil layer is never accidentally siphoned into the clean water output.

---

## Core Subsystems & Documentation

Select a subsystem below to access official documentation, guides, and engineering schematics:

* **[MARK LXXXV: Updated Documentation](https://docs.google.com/document/d/1vnpWTk1y4zddr_BgbKrFc2Xci1EIHBN9/edit?usp=sharing&ouid=107184543898886461189&rtpof=true&sd=true)**
  Complete documentation of the entire system.

* **[OPERATION MANUAL: System Guide](https://drive.google.com/file/d/124donzZ3W-ylivHNWVT0bv2F2x4H0uxS/view?usp=sharing)**
  Step by step instructions on how to operate the system.

* **[NARRATIVE: Development Logs](https://drive.google.com/drive/folders/1FV_DKX2hfK0zrKAh-ho9xLOKhTMqVQG0?usp=sharing)**
  Individual project development narratives and chronological progress logs.

* **[CIRCUITRY: Schematic Diagram](https://drive.google.com/file/d/1-mmfR8PQmrm2JWBcS-FNmuH-DSIFj7XZ/view?usp=sharing)**
  Diagram of the entire system.

---

## Project Roster

**Mindoro State University - Bongabong Campus**

> "Part of the journey is the end."

### Leadership & Advisory
* **Project Lead:** John Joshua Manalo Escarez
* **Research Adviser:** Christian Cabrera (XianCa)

### Development Team
* Carl Ivan Alcantara
* Ramer Roblo
* Johnwee Tamboong
* Jackielyn Garilao
* Raysie Mampuste
* Ayessa Mabunga
* Kyla Mae Gabutero
* Kim Justine Ramat

---

> "Sometimes you gotta run before you can walk."
