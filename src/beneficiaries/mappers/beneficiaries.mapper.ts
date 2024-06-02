import { PaginatedResultDao } from 'src/utils/shared/api/dao/pagination.dao';
import { CreateUUIDService } from 'src/utils/shared/api/services/create.uuid.service';
import { CreateBeneficiariesDao } from '../dao/create.beneficiaries.dao';
import { GetBeneficiariesDao } from '../dao/get.beneficiaries.dao';
import { CreateBenficiariesDto } from '../dtos/create.benficiary.dto';
import { Beneficiaries } from '../entities/beneficiary.entity';
import { MedicalHistory } from '../entities/medical.history.entity';
import { Parent } from '../entities/parent.entity';

export class BeneficiariesMapper {
  static mapToBeneficiariesPaginated(
    beneficiaries: Beneficiaries[],
    totalPages: number,
    hasNextPage: boolean,
    hasPreviousPage: boolean,
    currentPage: number,
    pageSize: number,
  ): PaginatedResultDao<GetBeneficiariesDao> {
    return {
      data: beneficiaries.map((b) => BeneficiariesMapper.mapToGetDao(b)),
      totalPages: totalPages,
      hasNextPage: hasNextPage,
      hasPreviousPage: hasPreviousPage,
      currentPage: currentPage,
      pageSize: pageSize,
    };
  }
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

  static mapToGetDao(beneficiary: Beneficiaries): GetBeneficiariesDao {
    const parent = beneficiary.parent as unknown as Parent;
    const medicalHistories =
      beneficiary.medicalHistories as unknown as MedicalHistory[];
    return {
      id: beneficiary._id,
      name: beneficiary.name,
      lastname: beneficiary.lastname,
      birthday: beneficiary.birthday,
      isPlayingSports: beneficiary.isPlayingSports,
      createdAt: beneficiary.createdAt,
      gender: beneficiary.gender,
      alergies: beneficiary.alergies.map((a) => ({
        id: a._id,
        name: a.name,
      })),
      medicalHistories: medicalHistories.map((m) => ({
        id: m._id,
        height: m.height,
        weight: m.weight,
        createdAt: m.createdAt,
      })),

      parent: {
        id: parent._id,
        name: parent.name,
        lastname: parent.lastname,
        phoneNumber: parent.phoneNumber,
      },
    };
  }
}
