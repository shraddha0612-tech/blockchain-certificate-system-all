
async function main() {
  const CertificateRegistry = await ethers.deployContract("CertificateRegistry");
  await CertificateRegistry.waitForDeployment();
  console.log("CertificateRegistry deployed to:", CertificateRegistry.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
