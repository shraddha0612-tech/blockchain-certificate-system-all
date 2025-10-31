
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract CertificateRegistry {
    struct Certificate {
        string name;
        string course;
        string institute;
        uint256 date;
        address issuedBy;
        bool valid;
    }

    mapping(bytes32 => Certificate) public certificates;

    event CertificateIssued(bytes32 indexed certHash, string name, string course, address indexed issuedBy);
    event CertificateRevoked(bytes32 indexed certHash);

    function issueCertificate(string calldata name, string calldata course, string calldata institute, uint256 date) external {
        bytes32 certHash = keccak256(abi.encodePacked(name, course, institute, date, msg.sender));
        certificates[certHash] = Certificate(name, course, institute, date, msg.sender, true);
        emit CertificateIssued(certHash, name, course, msg.sender);
    }

    function verifyCertificate(bytes32 certHash) external view returns (Certificate memory) {
        return certificates[certHash];
    }

    function revokeCertificate(bytes32 certHash) external {
        require(certificates[certHash].issuedBy == msg.sender, "Not authorized");
        certificates[certHash].valid = false;
        emit CertificateRevoked(certHash);
    }
}
