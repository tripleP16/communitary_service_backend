import { CreateUUIDService } from 'src/utils/shared/api/services/create.uuid.service';
import { CreateBeneficiariesDao } from '../dao/create.beneficiaries.dao';
import { CreateBenficiariesDto } from '../dtos/create.benficiary.dto';

export class BeneficiariesMapper {
  static mapToEntity(dto: CreateBenficiariesDto): CreateBeneficiariesDao {
    return {
      _id: CreateUUIDService.getUUID(),
      createdAt: new Date(),
      name: dto.name,
      lastname: dto.lastname,
      birthday: dto.birthday,
      isPlayingSports: dto.isPlayingSports,
      gender: dto.gender,
      parent: {
        _id: CreateUUIDService.getUUID(),
        name: dto.parent.name,
        lastname: dto.parent.lastname,
        phoneNumber: dto.parent.phoneNumber,
      },
      alergies: dto.alergies.map((a) => a.id),
      medicalHistories: [
        {
          _id: CreateUUIDService.getUUID(),
          height: dto.medicalHistory.height,
          weight: dto.medicalHistory.weight,
          createdAt: dto.medicalHistory.createdAt,
        },
      ],
    };
  }
}
