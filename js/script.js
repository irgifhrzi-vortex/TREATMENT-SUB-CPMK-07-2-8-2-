const formPendaftaran = document.getElementById('formPendaftaran');

if (formPendaftaran) {
    formPendaftaran.addEventListener('submit', function(e) {
        e.preventDefault(); 

        // 1. Ambil SEMUA nilai input berdasarkan ID HTML Anda
        const namaDepan = document.getElementById('first-name').value;
        const namaBelakang = document.getElementById('last-name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const dob = document.getElementById('dob').value;
        const gender = document.getElementById('gender').value;
        const city = document.getElementById('city').value;
        
        // Cek paket mana yang dipilih
        const paketElemen = document.querySelector('input[name="package"]:checked');
        const paket = paketElemen ? paketElemen.value : '-';

        // 2. Bungkus semua data ke dalam satu objek lengkap
        const dataBaru = {
            nama: namaDepan + " " + namaBelakang,
            email: email,
            phone: phone,
            dob: dob,
            gender: gender,
            city: city,
            paket: paket,
            tanggalDaftar: new Date().toLocaleDateString('id-ID') // Otomatis catat tanggal hari ini
        };

        // 3. Simpan ke localStorage
        let kotakData = JSON.parse(localStorage.getItem('dataGym')) || [];
        kotakData.push(dataBaru);
        localStorage.setItem('dataGym', JSON.stringify(kotakData));

        // 4. Pindah ke halaman tabel
        window.location.href = 'tabel.html';
    });
}

const tableBody = document.getElementById('tableBody');

if (tableBody) {
    let kotakData = JSON.parse(localStorage.getItem('dataGym')) || [];

    if (kotakData.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="10" style="text-align:center;">Belum ada data member.</td></tr>';
    } else {
        let barisHTML = '';
        
        kotakData.forEach(function(member, index) {
            // Gunakan operator || '-' untuk menampilkan garis jika kolom dikosongkan oleh user
            barisHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${member.nama}</td>
                    <td>${member.email}</td>
                    <td>${member.phone || '-'}</td>
                    <td class="hide-sm">${member.gender || '-'}</td>
                    <td class="hide-sm">${member.city || '-'}</td>
                    <td class="hide-sm">${member.dob || '-'}</td>
                    <td><span class="badge">${member.paket}</span></td>
                    <td>${member.tanggalDaftar}</td>
                    <td>-</td>
                </tr>
            `;
        });

        // Tampilkan ke tabel
        tableBody.innerHTML = barisHTML;
    }
}