---
title: Installing the windows terminal
desc: Installing the windows terminal and setting up the linux bash
a: windows-terminal
date: 2020-10-10
image: index.jpg
tags:
  - Windows
  - Terminal
  - Tutorial
  - Setup
  - Linux
  - Command Line
---
## What is the windows terminal?
The Windows Terminal is a command line interface that operates similarly to the Command Prompt. The feature was announced over two years ago with a [launch trailer](https://www.youtube.com/watch?v=8gw0rXPMMPE) that show cased tabs, extensive customization, and the ability to run linux bash from your choice of distro. 

Microsoft has the feature on [github](https://github.com/microsoft/terminal) where you can ask questions, open issues, and contribute to the project.

## Getting set up
The Windows Terminal is a feature that is not enabled by default but installation is quick and simple. You can follow these steps to install the Windows Terminal on windows 10 with the Linux Subsystem. If there's any issues check the installation docs [here](https://docs.microsoft.com/en-us/windows/wsl/install-win10).
<br />
- Launch Windows Power Shell with Administrator rights
<br />
  Use the Windows Key (⊞) to bring up windows search and look for Powershell 

  Right click Powershell and hit Run as Administrator
<br />
- Enable the Linux Subsystem feature
<br />
  ```powershell
  dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
  ```
<br />
- Enable the virtual machine
<br />
  *Only some Window builds support this feature refer to the [documentation](https://docs.microsoft.com/en-us/windows/wsl/install-win10#step-2---check-requirements-for-running-wsl-2) to see what's supported.*
  ```powershell
  dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
  ```
<br />
- Install the WSL2 Linux Kernal 
<br />
  We will need to install some additional packages to support the linux kernel you can get the package from [here](https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi)
<br />
- Set WSL2 as the default
<br />
  ```powershell
  wsl --set-default-version 2
  ```
<br />
- Choose your prefered linux distro
<br />
  The [Microsoft Store](https://www.microsoft.com/en-us/store/apps/windows) has a selection of different Linux distros you can download. You can refer to the documenetation [here](https://docs.microsoft.com/en-us/windows/wsl/install-win10#step-6---install-your-linux-distribution-of-choice) to see what is supported.
<br />
- Launch Windows Terminal and Linux Bash
<br />
  Use the Windows Key (⊞) to bring up windows search and look for Windows Terminal

  Once you have the application launched look for the dropdown menu (v)

  Select your Linux distro