# Avoiding Common Mistakes
I took some simple steps to make sure I avoid common mistakes when it comes to the security of my MediaGallery contract.

The sections below describes the steps taken to mitigate against potential contract vulnerabilities. 

## 1. Logic Bugs
Simple programming mistakes can cause the contract to behave differently to its stated rules, especially on 'edge cases'.

I have mitigated against this risk by:

* Following Solidity coding standards and general coding best practices for safety-critical software.
* Avoiding overly complex rules (even at the cost of some functionality) or complicated implementation (even at the cost of some gas).

Note that I have chosen not to include a mechanism for fixing bugs during the life of the contract due to concern that this mechanism would itself be a serious vulnerability. 